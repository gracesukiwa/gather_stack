const steps = [
  { num: '01', color: 'bg-pink', text: 'white', title: 'Order Online', desc: 'Pick your quantity, fill in your details, and place your order in under 2 minutes.' },
  { num: '02', color: 'bg-lime', text: 'gray-900', title: 'We Ship to You', desc: 'Your GatherStack arrives in 3–5 business days in our iconic packaging.' },
  { num: '03', color: 'bg-teal', text: 'white', title: 'Gather Your Crew', desc: 'Invite 2–6 friends, open the box, and deal the first round.' },
  { num: '04', color: 'bg-yellow', text: 'gray-900', title: 'Phones Down, Fun Up', desc: 'Laugh, compete, argue about who cheated — create memories that actually last.' },
];

export default function HowItWorks() {
  return (
    <section id="about" className="py-24 px-5 bg-gray-900 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink/10 morph" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal/10 morph" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-lime/20 border border-lime/30 px-4 py-2 rounded-full text-sm font-body font-semibold text-lime mb-6">
            How It Works
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            From zero to epic hangout in 4 steps
          </h2>
          <p className="font-body text-gray-400 text-lg leading-relaxed">
            We made it embarrassingly easy to go from "what should we do" to "let's play another round."
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-white/10 z-0" style={{ width: 'calc(100% - 2rem)', left: 'calc(50% + 2rem)' }} />
              )}
              <div className="relative z-10 bg-white/5 border border-white/10 rounded-4xl p-6 hover:bg-white/8 transition-colors">
                <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center font-display text-xl font-bold text-${s.text} mb-5`}>
                  {s.num}
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-2">{s.title}</h3>
                <p className="font-body text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
