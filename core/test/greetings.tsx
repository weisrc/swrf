/* @jsx h */
import { h, For, Props, Show } from "../src";

export default (props: Props<{ name: string }>) => {
	console.log("Greetings", props);
	return (
		<h1>
			<For each={[1, 2, 3]}>
				{(i) => {
					return (
						<For each={[1, 2, 3]}>
							{(i) => {
								return (
									<span>
										<Show when={true}>
											<Show when={true}>
												<span>Hello {props.name}</span>
											</Show>
										</Show>
									</span>
								);
							}}
						</For>
					);
				}}
			</For>
		</h1>
	);
};
