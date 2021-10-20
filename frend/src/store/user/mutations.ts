import { MutationTree } from 'vuex';
import { UserData, UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  setUser (state: UserStateInterface, user: UserData) {
    state.user = user
  }
};

export default mutation;
