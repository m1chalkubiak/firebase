import { createActions as rsCreateActions, createReducer as rsCreateReducer } from 'reduxsauce';
import { eventChannel } from 'redux-saga';
import { takeEvery, select, fork, take, put } from 'redux-saga/effects';
import reportError from 'report-error';
import { defaultTo, mapObjIndexed, complement, isNil } from 'ramda';
import { Map, fromJS } from 'immutable';


export const createActions = (actions, options) => rsCreateActions({
  ...actions,
  updateItems: ['data', 'collectionName'],
  startListening: ['childPath', 'collectionName'],
}, options);

export const createReducer = (initialState, actionHandlers, { types }) => {
  const updateItems = (state, { data, collectionName }) => state
    .updateIn([collectionName], Map(), (collection) => collection
      .merge(fromJS(data))
      .filter(complement(isNil))
    );

  return rsCreateReducer(initialState, {
    ...actionHandlers,
    [types.UPDATE_ITEMS]: updateItems,
  });
};

export const createSaga = ({ actions, types, baseDbRef, registrySelector, defaultValue = {} }) => {
  const createChildAddedEventChannel = (dbRef) => eventChannel(emit => {
    const listener = dbRef.on('child_added', (snapshot) => {
      setTimeout(() => {
        emit({
          _id: snapshot.key,
          value: defaultTo(defaultValue, snapshot.val()),
        });
      }, 0);
    });
    return () => dbRef.off('child_added', listener);
  });

  const createChildRemovedEventChannel = (dbRef) => eventChannel(emit => {
    const listener = dbRef.on('child_removed', (snapshot) => {
      setTimeout(() => {
        emit({ _id: snapshot.key });
      }, 0);
    });
    return () => dbRef.off('child_removed', listener);
  });

  const createChildChangedEventChannel = (dbRef) => eventChannel(emit => {
    const listener = dbRef.on('child_changed', (snapshot) => {
      setTimeout(() => {
        emit({
          _id: snapshot.key,
          value: defaultTo(defaultValue, snapshot.val()),
        });
      }, 0);
    });
    return () => dbRef.off('child_changed', listener);
  });

  function* closeChannelOnNewListen(channel, channelCollectionName) {
    try {
      while (true) {
        const { collectionName } = yield take(types.START_LISTENING);
        if (collectionName === channelCollectionName) {
          channel.close();
          return;
        }
      }
    } catch (error) {
      /* istanbul ignore next */
      reportError(error);
    }
  }

  function* startListeningForNewChildren(dbRef, collectionName) {
    try {
      const channel = createChildAddedEventChannel(dbRef);

      yield fork(closeChannelOnNewListen, channel, collectionName);

      while (true) { // eslint-disable-line
        const data = yield take(channel);
        const registry = yield select(registrySelector);

        if (!registry.hasIn([collectionName, data._id])) {
          yield put(actions.updateItems({ [data._id]: data }, collectionName));
        }
      }
    } catch (error) {
      /* istanbul ignore next */
      reportError(error);
    }
  }

  function* startListeningForChildrenChanges(dbRef, collectionName) {
    try {
      const channel = createChildChangedEventChannel(dbRef);

      yield fork(closeChannelOnNewListen, channel, collectionName);

      while (true) { // eslint-disable-line
        const data = yield take(channel);

        yield put(actions.updateItems({ [data._id]: data }, collectionName));
      }
    } catch (error) {
      /* istanbul ignore next */
      reportError(error);
    }
  }

  function* startListeningForChildrenDeletion(dbRef, collectionName) {
    try {
      const channel = createChildRemovedEventChannel(dbRef);

      yield fork(closeChannelOnNewListen, channel, collectionName);

      while (true) { // eslint-disable-line
        const data = yield take(channel);

        yield put(actions.updateItems({ [data._id]: null }, collectionName));
      }
    } catch (error) {
      /* istanbul ignore next */
      reportError(error);
    }
  }

  function* startListeningForList(dbRef, collectionName) {
    try {
      yield fork(startListeningForNewChildren, dbRef, collectionName);
      yield fork(startListeningForChildrenChanges, dbRef, collectionName);
      yield fork(startListeningForChildrenDeletion, dbRef, collectionName);
    } catch (error) {
      /* istanbul ignore next */
      reportError(error);
    }
  }

  function* listenForData({ childPath, collectionName }) {
    try {
      const dbRef = baseDbRef.child(childPath);
      const initialValue = mapObjIndexed((value, id) => ({
        _id: id,
        value: defaultTo(defaultValue, value),
      }))((yield dbRef.once('value')).val());

      yield put(actions.updateItems(initialValue, collectionName));

      yield fork(startListeningForList, dbRef, collectionName);
    } catch (error) {
      /* istanbul ignore next */
      reportError(error);
    }
  }

  return function* () {
    yield takeEvery(types.START_LISTENING, listenForData);
  };
};
