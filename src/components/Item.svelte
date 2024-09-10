<script lang="ts">
	import type { Item } from '../types/item';
	import { gameState } from '../store/store';
	import type { GameState } from '../types/gameState';
	import { format } from '../util/number_formatting';
	export let item: Item;
	export let index: number;

	function buyItem(gameState: GameState) {
		const price = getPrice(gameState);
		if (gameState.current.seeds < price) {
			return;
		}
		$gameState.current.seeds -= price;
		$gameState.current.items[index][1]++;
	}

	function canBuy(gameState: GameState) {
		return gameState.current.seeds >= getPrice(gameState);
	}

	function getPrice(gameState: GameState) {
		const numberOfItems = gameState.current.items[index];
		return Math.floor(item.basePrice * Math.pow(item.priceScaling, numberOfItems[1]));
	}

	function getName(gameState: GameState) {
		if (!item.requirement?.shouldOnlyShowOutline(gameState)) {
			return item.name;
		} else {
			return '???';
		}
	}

	function isOutLine(gameState: GameState) {
		return item.requirement?.shouldOnlyShowOutline(gameState);
	}
</script>

<button
	on:click={() => buyItem($gameState)}
	disabled={!canBuy($gameState)}
	class="block w-full bg-primary border border-black disabled:bg-bg p-2 rounded-md my-1"
>
	<div class="flex items-center space-x-4 mx-auto w-full">
		<div class="relative">
			<img
				src={isOutLine($gameState) ? 'gumman_mystery.webp' : 'gumman.jpg'}
				alt={getName($gameState)}
				width="80px"
				class="rounded-full"
			/>
			{#if $gameState.current.items[index][1] > 0}
				<span class="absolute bottom-0 right-0 text-xs p-1 bg-bg border border-secondary rounded-full">
					{format($gameState.current.items[index][1])}
				</span>
			{/if}
		</div>
		<div>
			<span class="text-lg font-bold">{getName($gameState)}</span>
			{#if !isOutLine($gameState)}
				<br />
				Cost: <strong>{format(getPrice($gameState))}</strong> seeds
				{#if $gameState.current.items[index][1] > 0 && item.sps}
					<br />
					Generating <strong>{format($gameState.current.items[index][1] * item.sps)}</strong>
					<span title="seeds per second">sps</span>
				{/if}
				{#if $gameState.current.items[index][1] > 0 && item.clickpower}
					<br />
					Giving <strong>{format($gameState.current.items[index][1] * item.clickpower)}</strong> clickpower
				{/if}
			{/if}
		</div>
	</div>
</button>
