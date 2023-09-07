// export const useRouter = <T extends RouteMap>(
// 	routes: T
// ): Record<keyof T, string> => {
// 	return routes;
// };

// const {} = useRouter({
// 	home: { path: "/" },
// });

// export type Route = {
// 	path: string;
// 	params?: string[];
// 	query?: string[];
// 	children?: RouteMap;
// };

// export type RouteMap = Record<string, Route>;

// export type RouteSignal<T extends Route> = Signal<{
  
// }>

// export type RouteSignalMap<T extends RouteMap> = {
// 	[key in keyof T]: T[key] extends { children: infer C }
// 		? RouteMapGet<C>
// 		: string;
// };