import 'babel-polyfill';
import 'isomorphic-fetch';
import 'jest-enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import chaiJestDiff from 'chai-jest-diff';
import { css as mockCss } from 'styled-components';

Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());
chai.use(sinonChai);
chai.use(chaiJestDiff());
chai.config.includeStack = true;

/**
 * This object overrides environment configuration
 */
jest.mock('local-env-config', () => ({
  localEnvConfigLoaded: true,
}));

jest.mock('../../app/theme/sprites', () => ({
  mobile: mockCss``,
  desktop: mockCss``,
}));
