import { Store, useStore as baseUseStore } from 'vuex';
import { State } from '.';
import { storeKey } from './storeKey';

export function useStore(): Store<State> {
	return baseUseStore(storeKey);
}
