<script lang="ts">
	interface Quote {
		quote: String;
		source?: String;
	}
	const quotes: Quote[] = [
		{
			quote: 'You reap what you sow',
			source: 'Old proverb',
		},
		{
			quote: 'Let there be a thousand blossoms bloom, as far as I am concerned',
			source: 'Bob Katter',
		},
		{
			quote: 'Don’t Judge Each Day by the Harvest You Reap but by the Seeds that you Plant',
			source: 'Robert Louis Stevenson',
		},
		{
			quote: 'Gumman',
			source: 'chin',
		},
		{
			quote: "keep on pongin' in the seed world",
			source: 'chin',
		},
		{
			quote: "They tried to throw dirt & bury me ..they didn't know I was a seed ✨",
			source: 'Pongo',
		},
		{
			quote: 'Happiness held is the seed; Happiness shared is the flower',
			source: 'John Harrigan',
		},
		{
			quote: 'There are always flowers for those who want to see them',
			source: 'Henri Matisse',
		},
		{
			quote: 'Flowers don’t tell, they show',
			source: 'Stephanie Skeem',
		},
		{
			quote: 'All the flowers of the tomorrows are in the seeds of today',
		},
		{
			quote: 'Earth laughs in flowers',
			source: 'Ralph Waldo Emerson',
		},
		{
			quote: 'To plant a garden is to believe in tomorrow',
			source: 'Audrey Hepburn',
		},
		{
			quote: 'It is only the farmer who faithfully plants seeds in the Spring, who reaps a harvest in the Autumn',
			source: 'B. C. Forbes',
		},
		{
			quote: 'Whatever our dreams, ideas or projects, we plant a seed, nurture it and then reap the fruits of our labor.',
			source: 'Oprah Winfrey',
		},
		{
			quote: "Legacy. What is a legacy? It's planting seeds in a garden you never get to see",
			source: 'Lin Manuel-Miranda',
		},
		{
			quote: 'Once in a golden hour, I cast to earth a seed, And up there grew a flower, That others called a weed',
			source: 'Alfred Lord Tennyson',
		},
		{
			quote: 'To see things in the seed, that is genius',
			source: 'Lao Tzu',
		},
		{
			quote: 'Any fool can count the seeds in an apple. Only God can count all the apples in one seed',
			source: 'Robert H. Schuller',
		},
		{
			quote: 'I ask not for a larger garden, but for finer seeds.',
			source: 'Russell Conwell',
		},
		{
			quote: 'Its good to leave each day behind, like flowing water, free of sadness. Yesterday is gone and its tale told. Today new seeds are growing.',
			source: 'Rumi',
		},
		{
			quote: 'We carry the seeds of happiness with us wherever we go.',
			source: 'Martha Washington',
		},
		{
			quote: 'We must sow the seed, not hoard it.',
			source: 'Saint Dominic',
		},
		{
			quote: "Keep your face to the sunshine and you cannot see the shadow. It's what sunflowers do.",
			source: 'Helen Keller',
		},
		{
			quote: 'Never look directly at the sun. Instead, look at the sunflower',
			source: 'Vera Nazarian',
		},
		{
			quote: 'Wherever life plants you, bloom with grace',
		},
		{
			quote: 'I want to be like a sunflower; so that even on the darkest days I will stand tall and find the sunlight',
		},
		{
			quote: 'Normalize being a friendly sunflower',
			source: 'Kveldsmat',
		},
	];

	// Pick a random quote
	const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
</script>

<div class="my-8">
	<p><i>{randomQuote.quote}</i></p>
	<p class="text-xs">{randomQuote.source ?? 'unknown'}</p>
</div>
