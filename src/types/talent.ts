export interface Talent {
    name: string,
    description: string,
    requires?: string, //name of another talent
    //TODO add field "effect"
}

export interface Spec {
    name: string,
    talents: Talent[],
}

export interface TalentTree {
    specs: Spec[],
}

export const talentTree: TalentTree =  {
    specs: [
        {
            name: "Click",
            talents: [
                { name: 'Clicky Claura', description: "2x click power" },
                { name: 'Click god', description: "smth.....", requires: 'Clicky Claura' }
            ],
        },
        {
            name: "Idle",
            talents: [
                { name: 'Passive Peter', description: "2x seeds per second" },
                { name: 'Friend of the hourglass', description: "smth.....", requires: 'Passive Peter' }
            ],
        },
    ]
}