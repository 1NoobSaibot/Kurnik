import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';

const getters: GetterTree<UserStateInterface, StateInterface> = {
  accessToken (state: UserStateInterface): string {
    return state.user?.accessToken || ''
  }
};

export default getters;
