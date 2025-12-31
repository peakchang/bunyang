// import adapter from '@sveltejs/adapter-auto';
import adapter from "@sveltejs/adapter-node";
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			// 공통 코드 최상단 폴더를 $core 로 별칭 줌
			$core: path.resolve('../../../packages/core/src')
			// 필요하면 $core/components 이런 식으로 더 쪼개도 됨
		}
	}
};

export default config;
