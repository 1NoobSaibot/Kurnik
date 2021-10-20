import { axios } from 'src/boot/axios';
import { ActionContext, ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserData, UserStateInterface } from './state';

const actions: ActionTree<UserStateInterface, StateInterface> = {
	async login (ctx: ActionContext<UserStateInterface, StateInterface>, authData: { login: string, password: string }) {
		try {
			const res = await axios.post<UserData>('api/user/login', {
				login: authData.login,
				password: authData.password
			})
			ctx.commit('setUser', res.data)
		} catch (error) {
			alert('Failed to load Profile')
		}
	}
};

export default actions;
