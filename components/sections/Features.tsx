const features = [
  {
    emoji: '📦',
    color: '#ED769E',
    bg: 'bg-pink/10',
    title: 'Pocket-Sized',
    desc: 'Fits in your bag, backpack, or even your pocket. Take GatherStack anywhere — cafes, parks, road trips.',
  },
  {
    emoji: '🚫📱',
    color: '#20B8B3',
    bg: 'bg-teal/10',
    title: 'Phone-Free Fun',
    desc: 'Designed to create a natural reason to put phones face-down. No guilt, no nagging — just play.',
  },
  {
    emoji: '🎭',
    color: '#FFD166',
    bg: 'bg-yellow/20',
    title: 'Multiple Game Modes',
    desc: 'From trivia to drawing challenges, dares to debates. Every round feels completely different.',
  },
  {
    emoji: '🌍',
    color: '#DEE864',
    bg: 'bg-lime/20',
    title: 'Works Everywhere',
    desc: 'No electricity, no apps, no Wi-Fi. GatherStack works in any setting with any group of people.',
  },
  {
    emoji: '😂',
    color: '#FA6565',
    bg: 'bg-red/10',
    title: 'Instant Laughs',
    desc: 'Prompts engineered for maximum awkward fun. The kind of moments you\'ll still talk about months later.',
  },
  {
    emoji: '🎁',
    color: '#ED769E',
    bg: 'bg-pink/10',
    title: 'Perfect Gift',
    desc: 'Beautiful packaging that needs zero wrapping. Give the gift of actual quality time together.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-teal/15 border border-teal/30 px-4 py-2 rounded-full text-sm font-body font-semibold text-teal mb-6">
            Why GatherStack
          </div>
          <h2 className="section-title mb-4">
            Built for real hangouts,<br />not highlight reels
          </h2>
          <p className="font-body text-gray-600 text-lg leading-relaxed">
            Every detail is designed to lower the barrier between "let's hang" and actually having the best time.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="card hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                {f.emoji}
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="font-body text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
