const defaults = {
  hideCursor: false,
  interval: 1900,
  pitch: [1, 1],
  rate: [1, 1],
  colder: `Colder`,
  hotter: `Hotter`,
  language: `en-US`,
  click: 'Click now!',
  found: 'Found!'
}

export const levels = [
  {
    ...defaults,
    goal: 0.08,
    goalArea: 0.3,
    intro: 'Level 1: United States'
  },
  {
    ...defaults,
    goal: 0.04,
    goalArea: 0.18,
    colder: `Colder`,
    hotter: `Warmer`,
    language: `en-GB`,
    click: 'Bloody click it!',
    intro: 'Level 2: Great Britain'
  },
  {
    ...defaults,
    goal: 0.03,
    goalArea: 0.15,
    colder: `colder`,
    hotter: `warmer`,
    language: `en-AU`,
    click: 'Oi, Smash it!',
    intro: 'Level 3: Australia'
  },
  {
    ...defaults,
    goal: 0.02,
    goalArea: 0.20,
    language: `en-IN`,
    click: 'Hit it!',
    intro: 'Level 4: Ireland'
  },
  {
    ...defaults,
    goal: 0.02,
    goalArea: 0.3,
    colder: `kälter`,
    hotter: `Wärmer`,
    language: `de-DE`,
    click: 'Klick jetzt',
    intro: 'Final level: Germany. Hidden cursor.',
    pitch: [1, 1.6],
    rate: [1, 1.4],
    hideCursor: true
  },
]
