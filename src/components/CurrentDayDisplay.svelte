<script lang="ts">
	interface Props {
		date: Date;
	}

	let { date }: Props = $props();

	const randomLocales = [
		'de-DE', // German (Germany)
		'ar-EG', // Arabic (Egypt)
		'en-US', // English (United States)
		'en-GB', // English (United Kingdom)
		'fr-FR', // French (France)
		'es-ES', // Spanish (Spain)
		'it-IT', // Italian (Italy)
		'ja-JP', // Japanese (Japan)
		'zh-CN', // Chinese (Simplified, China)
		'ko-KR', // Korean (South Korea)
		'pt-BR', // Portuguese (Brazil)
		'nl-NL', // Dutch (Netherlands)
		'ru-RU', // Russian (Russia)
		'sv-SE', // Swedish (Sweden)
		'pl-PL', // Polish (Poland)
		'tr-TR', // Turkish (Turkey)
		'hi-IN', // Hindi (India)
		'he-IL', // Hebrew (Israel)
		'fi-FI', // Finnish (Finland)
		'da-DK', // Danish (Denmark)
		'no-NO', // Norwegian (Norway)
		'th-TH', // Thai (Thailand)
		'cs-CZ', // Czech (Czech Republic)
		'el-GR', // Greek (Greece)
		'hu-HU', // Hungarian (Hungary)
		'id-ID', // Indonesian (Indonesia)
		'ms-MY', // Malay (Malaysia)
		'vi-VN', // Vietnamese (Vietnam)
		'ro-RO', // Romanian (Romania)
		'bg-BG', // Bulgarian (Bulgaria)
		'uk-UA', // Ukrainian (Ukraine)
		'fa-IR', // Persian (Iran)
	];
	let currentLocale: string | null = $state(null);
	function randomiseLocale() {
		currentLocale = randomLocales[Math.floor(Math.random() * randomLocales.length)];
		console.log(currentLocale);
	}
</script>

<button onclick={randomiseLocale} class="text-xl mb-4">
	<span class="text-xs">{currentLocale}</span>
	{date.toLocaleDateString(currentLocale ?? [])}
</button>
