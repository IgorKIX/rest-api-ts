// eslint-disable-next-line @typescript-eslint/ban-types
export const tryToCatch = async (fn: Function, args: any) => {
	try {
		return [null, await fn(...args)];
	} catch (e: any) {
		return [e];
	}
};
