import {DiceRoller} from './diceRoller';
import {Faction, FactionsHelper} from './factions';
import {SocialClassesHelper} from './socialClasses';
import {BirthPlacesHelper, HeritageTraits} from './birthPlaces';
import {AlienHost} from './alienHosts';
import {character} from '../common/character';

export class YuJingYouthEventModel {
    private _description: string;
    private _onApply: () => void;

    constructor(description: string, onApply?: () => void) {
        this._description = description;
        this._onApply = onApply;
    }

    get description() {
        return this._description;
    }

    set description(val: string) {
        this._description = val;
    }

    apply() {
        this._onApply();
    }
}

export class CompositeYuJingYouthEventModel extends YuJingYouthEventModel {
    private _event1: YuJingYouthEventModel;
    private _event2: YuJingYouthEventModel;

    constructor(event1: YuJingYouthEventModel, event2: YuJingYouthEventModel) {
        super("");
        this._event1 = event1;
        this._event2 = event2;
    }

    get description() {
        return this._event1.description + " & " + this._event2.description;
    }

    apply() {
        if (this._event1.apply) this._event1.apply();
        if (this._event2.apply) this._event2.apply();
    }
}

export class YouthEvents {
    generateEvent() {
        var type = Math.floor(Math.random() * 20) + 1;
        var roll = Math.floor(Math.random() * 6) + 1;
        var event = this.getEvent(type, roll);
        return event;
    }

    getEvent(type: number, roll: number): YuJingYouthEventModel {
        /*if (character.host === AlienHost.Dogface ||
            character.host === AlienHost.Wulver) {
            return this.getDogfaceOrWulverEvent(type, roll);
        }
        else if (character.host === AlienHost.Antipode) {
            return this.getAntipodeEvent(type, roll);
        }*/
        console.log("YuJingYouthEvent for "+character.heritageTrait+"("+type+","+roll+")");
        switch(character.heritageTrait){
            case HeritageTraits.Laowai:
                switch(type) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Witnessed forced relocation", () => { });
                                case 2: return new YuJingYouthEventModel("Witnessed a murder", () => { });
                                case 3: return new YuJingYouthEventModel("Witnessed a kidnapping", () => { });
                                case 4: return new YuJingYouthEventModel("Witnessed treason", () => { });
                                case 5: return new YuJingYouthEventModel("Witnessed abuse of power", () => { });
                                case 6: return new YuJingYouthEventModel("Witnessed unearned privilege", () => { });
                            }
                        }
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Endured bigotry", () => { });
                                case 2: return new YuJingYouthEventModel("Endured a natural disaster", () => { });
                                case 3: return new YuJingYouthEventModel("Endured slum housing", () => { });
                                case 4: return new YuJingYouthEventModel("Endured mob violence", () => { });
                                case 5: return new YuJingYouthEventModel("Endured systematic exclusion", () => { });
                                case 6: return new YuJingYouthEventModel("Endured bullying", () => { });
                            }
                        }
                        break;
                    case 11:
                    case 12:
                    case 13:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Involved in gangs", () => { });
                                case 2: return new YuJingYouthEventModel("Involved in Hexahedron surveillance", () => { });
                                case 3: return new YuJingYouthEventModel("Involved in corporate sabotage", () => { });
                                case 4: return new YuJingYouthEventModel("Involved in drug trafficking", () => { });
                                case 5: return new YuJingYouthEventModel("Involved in gifted programs", () => { });
                                case 6: return new YuJingYouthEventModel("Involved in fight clubs", () => { });
                            }
                        }
                        break;
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Succumbed to propaganda", () => { });
                                case 2: return new YuJingYouthEventModel("Succumbed to social exclusion", () => { });
                                case 3: return new YuJingYouthEventModel("Succumbed to despair", () => { });
                                case 4: return new YuJingYouthEventModel("Succumbed to isolation", () => { });
                                case 5: return new YuJingYouthEventModel("Succumbed to untreated mental illness", () => { });
                                case 6: return new YuJingYouthEventModel("Succumbed to terror", () => { });
                            }
                        }
                        break;
                    case 18:
                    {
                        switch (roll) {
                            case 1: return new YuJingYouthEventModel("Gained a one asset debt: You owe someone a debt worth one Asset", () => { });
                            case 2: return new YuJingYouthEventModel("Changed social class: During your youth, your family experienced a shift in their economic status (" + SocialClassesHelper.getSocialClass(this.getNewSocialClass()).name + ")", () => { this.changeSocialClass() });
                            case 3: return new YuJingYouthEventModel("Gained a two asset debt: You owe someone a debt worth two Assets", () => { });
                            case 4: return new YuJingYouthEventModel("Cube destruction: The Cube used to store your personality has been destroyed. You'll begin play without a Cube.", () => { });
                            case 5: return new YuJingYouthEventModel("Gained Professional Contact 1", () => { }); //TODO Professional Contact X!!!
                            case 6: return new YuJingYouthEventModel("Gain one asset:  You've gained one additional Asset", () => { character.assets++; });
                        }
                    }
                    break;
                    case 19:
                        {
                            switch (roll) {
                                case 1: return new YuJingYouthEventModel("Gained a three asset debt: You owe someone a debt worth three Assets", () => { });
                                case 2: return this.blackmailMaterial();
                                case 3: return this.debilitatingCondition();
                                case 4: return this.vigorPoison(0, 3);
                                case 5: return this.blackmailMaterial();
                                case 6: return new YuJingYouthEventModel("Died! Your character died and was resurrected.", () => { character.applyDeath() });
                            }
                        }
                        break;
                    case 20:
                        {
                            var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            return new CompositeYuJingYouthEventModel(roll1, roll2);
                        }
                }
                break;
            case HeritageTraits.Shualài:
                switch(type) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Witnessed police corruption", () => { });
                                case 2: return new YuJingYouthEventModel("Witnessed abuse of authority", () => { });
                                case 3: return new YuJingYouthEventModel("Witnessed a murder", () => { });
                                case 4: return new YuJingYouthEventModel("Witnessed Kempeitai operations", () => { });
                                case 5: return new YuJingYouthEventModel("Witnessed elite hypocrisy", () => { });
                                case 6: return new YuJingYouthEventModel("Witnessed uncommon kindness", () => { });
                            }
                        }
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Involved in organised crime", () => { });
                                case 2: return new YuJingYouthEventModel("Involved in forced relocation", () => { });
                                case 3: return new YuJingYouthEventModel("Involved in ethnic profiling", () => { });
                                case 4: return new YuJingYouthEventModel("Involved in an accident", () => { });
                                case 5: return new YuJingYouthEventModel("Involved in mass arrests", () => { });
                                case 6: return new YuJingYouthEventModel("Involved in Otaku subculture", () => { });
                            }
                        }
                        break;
                    case 11:
                    case 12:
                    case 13:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Family Change: parent walks out", () => { });
                                case 2: return new YuJingYouthEventModel("Family Change: parents incarcerated", () => { });
                                case 3: return new YuJingYouthEventModel("Family Change: parents divorced", () => { });
                                case 4: return new YuJingYouthEventModel("Family Change: family member defects", () => { });
                                case 5: return new YuJingYouthEventModel("Family Change: family member dies", () => { });
                                case 6: return new YuJingYouthEventModel("Family Change: sibling goes missing", () => { });
                            }
                        }
                        break;
                    case 14:
                    case 15:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Discovered Otaku subculture", () => { });
                                case 2: return new YuJingYouthEventModel("Discovered sexual attraction", () => { });
                                case 3: return new YuJingYouthEventModel("Discovered religion", () => { });
                                case 4: return new YuJingYouthEventModel("Discovered Hao lù cronyism", () => { });
                                case 5: return new YuJingYouthEventModel("Discovered street racing", () => { });
                                case 6: return new YuJingYouthEventModel("Discovered corruption in local officials", () => { });
                            }
                        }
                        break;
                    case 16:
                    case 17:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Social Contacts: gained Yakuza contact", () => { });
                                case 2: return new YuJingYouthEventModel("Social Contacts: gained Otaku contacts", () => { });
                                case 3: return new YuJingYouthEventModel("Social Contacts: gained PanOceanian contact or rival", () => { });
                                case 4: return new YuJingYouthEventModel("Social Contacts: escaped the neighbourhood", () => { });
                                case 5: return new YuJingYouthEventModel("Social Contacts: had brush with opposite social class", () => { });
                                case 6: return new YuJingYouthEventModel("Social Contacts: made a university contact", () => { });
                            }
                        }
                        break;
                    case 18:
                    case 19:
                        {
                            switch (roll) {
                                case 1: return new YuJingYouthEventModel("Gained a two asset debt: You owe someone a debt worth two Assets", () => { });
                                case 2: return this.blackmailMaterial();
                                case 3: return new YuJingYouthEventModel("You’re accepted into the rigorous meiyo sheiken honour tests. You can freely select Military Training in Decision Six."); //TODO Free Military Training
                                case 4: return this.vigorPoison(0, 3);
                                case 5: return new YuJingYouthEventModel("Gained a three asset debt: You owe someone a debt worth three Assets", () => { });
                                case 6: return new YuJingYouthEventModel("Died! Your character died and was resurrected.", () => { character.applyDeath() });
                            }
                        }
                        break;
                    case 20:
                        {
                            var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            return new CompositeYuJingYouthEventModel(roll1, roll2);
                        }
                }
                break;
            case HeritageTraits.Guanxi:
                switch(type) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Witnessed inspiring loyalty", () => { });
                                case 2: return new YuJingYouthEventModel("Witnessed perjury", () => { });
                                case 3: return new YuJingYouthEventModel("Witnessed assassination", () => { });
                                case 4: return new YuJingYouthEventModel("Witnessed hard work rewarded", () => { });
                                case 5: return new YuJingYouthEventModel("Witnessed a violent crime", () => { });
                                case 6: return new YuJingYouthEventModel("Witnessed backroom politics", () => { });
                            }
                        }
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Involved in a scandal", () => { });
                                case 2: return new YuJingYouthEventModel("Involved in a children’s Mayaseries", () => { });
                                case 3: return new YuJingYouthEventModel("Involved in a prestigious competition", () => { });
                                case 4: return new YuJingYouthEventModel("Involved in an accident", () => { });
                                case 5: return new YuJingYouthEventModel("Involved in a major news event", () => { });
                                case 6: return new YuJingYouthEventModel("Involved in resurrection lottery", () => { });
                            }
                        }
                        break;
                    case 10:
                    case 11:
                    case 12:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Family Change: divorce", () => { });
                                case 2: return new YuJingYouthEventModel("Family Change: " + DiceRoller.rollSpecial(6, 1).hits + " siblings", () => { });
                                case 3: return new YuJingYouthEventModel("Family Change: sibling kidnaped", () => { });
                                case 4: return new YuJingYouthEventModel("Family Change: parents promoted", () => { });
                                case 5: return new YuJingYouthEventModel("Family Change: family member resurrected", () => { });
                                case 6: return new YuJingYouthEventModel("Family Change: family member killed", () => { });
                            }
                        }
                        break;
                    case 13:
                    case 14:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Social Contacts: had brush with opposite social class", () => { });
                                case 2: return new YuJingYouthEventModel("Social Contacts: gained Triad contacts", () => { });
                                case 3: return new YuJingYouthEventModel("Social Contacts: encountered a young Imperial heir", () => { });
                                case 4: return new YuJingYouthEventModel("Social Contacts: gained PanOceanian enemy", () => { });
                                case 5: return new YuJingYouthEventModel("Social Contacts: gained Party rival", () => { });
                                case 6: return new YuJingYouthEventModel("Social Contacts: made a university contact", () => { });
                            }
                        }
                        break;
                    case 15:
                    case 16:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Discovered Secret Ancestry: you are adopted", () => { });
                                case 2: return new YuJingYouthEventModel("Discovered Secret Ancestry: you are Japanese", () => { });
                                case 3: return new YuJingYouthEventModel("Discovered Secret Ancestry: you are Han Chinese", () => { });
                                case 4: return new YuJingYouthEventModel("Discovered Secret Ancestry: you are a child of a famous traitor", () => { });
                                case 5: return new YuJingYouthEventModel("Discovered Secret Ancestry: you are PanOceanian", () => { });
                                case 6: return new YuJingYouthEventModel("Discovered Secret Ancestry: you are a child of a criminal", () => { });
                            }
                        }
                        break;
                    case 17:
                    case 18:
                    case 19:
                        {
                            switch (roll) {
                                case 1: return new YuJingYouthEventModel("Learned a new language (" + this.getNewLanguage() + ")", () => { this.learnLanguage() });
                                case 2: return this.blackmailMaterial();
                                case 3: return this.vigorPoison(0, 1);
                                case 4: return new YuJingYouthEventModel("Gained a one asset debt: You owe someone a debt worth one Asset", () => { });
                                case 5: return new YuJingYouthEventModel("Defection! You've switched allegiance to a new faction (" + FactionsHelper.getFaction(this.getNewFaction()).name + ")", () => { this.defect(); });
                                case 6: return new YuJingYouthEventModel("Died! Your character died and was resurrected.", () => { character.applyDeath() });
                            }
                        }
                        break;
                    case 20:
                        {
                            var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            return new CompositeYuJingYouthEventModel(roll1, roll2);
                        }
                }
                break;
            case HeritageTraits.Chinese:
            case HeritageTraits.Party:
            case HeritageTraits.Imperial:
                switch(type) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Witnessed the Emperor", () => { });
                                case 2: return new YuJingYouthEventModel("Witnessed bigotry", () => { });
                                case 3: return new YuJingYouthEventModel("Witnessed Tatenokai attack", () => { });
                                case 4: return new YuJingYouthEventModel("Witnessed hypocrisy", () => { });
                                case 5: return new YuJingYouthEventModel("Witnessed PanOceanian sabotage", () => { });
                                case 6: return new YuJingYouthEventModel("Witnessed heroic sacrifice", () => { });
                            }
                        }
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Discovered religion", () => { });
                                case 2: return new YuJingYouthEventModel("Discovered competitive martial arts", () => { });
                                case 3: return new YuJingYouthEventModel("Discovered classical artistic talent", () => { });
                                case 4: return new YuJingYouthEventModel("Discovered a secret", () => { });
                                case 5: return new YuJingYouthEventModel("Discovered a scandal", () => { });
                                case 6: return new YuJingYouthEventModel("Discovered elite hypocrisy", () => { });
                            }
                        }
                        break;
                    case 10:
                    case 11:
                    case 12:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Inherited a warrior’s legacy", () => { });
                                case 2: return new YuJingYouthEventModel("Inherited family debts", () => { });
                                case 3: return new YuJingYouthEventModel("Inherited weighty expectations", () => { });
                                case 4: return new YuJingYouthEventModel("Inherited ceremonial tools", () => { });
                                case 5: return new YuJingYouthEventModel("Inherited head of household status", () => { });
                                case 6: return new YuJingYouthEventModel("Inherited a cabin in the Hăimen High Quarters", () => { });
                            }
                        }
                        break;
                    case 13:
                    case 14:
                    case 15:
                        {
                            switch(roll) {
                                case 1: return new YuJingYouthEventModel("Social Contacts: family worked with off-world ambassador", () => { });
                                case 2: return new YuJingYouthEventModel("Social Contacts: had brush with opposite social class", () => { });
                                case 3: return new YuJingYouthEventModel("Social Contacts: befriended an Imperial heir", () => { });
                                case 4: return new YuJingYouthEventModel("Social Contacts: gained PanOceanian enemy", () => { });
                                case 5: return new YuJingYouthEventModel("Social Contacts: gained O-12 contact", () => { });
                                case 6: return new YuJingYouthEventModel("Social Contacts: gained Corporation contact", () => { });
                            }
                        }
                        break;
                    case 16:
                    case 17:
                    case 18:
                        {
                            switch (roll) {
                                case 1: return new YuJingYouthEventModel("Gained a one asset debt: You owe someone a debt worth one Asset", () => { });
                                case 2: return this.blackmailMaterial();
                                case 3: return this.vigorPoison(0, 3);
                                case 4: return new YuJingYouthEventModel("Gain three assets:  You've gained three additional Assets", () => { character.assets+=3; });
                                case 5: return new YuJingYouthEventModel("Learned a new language (" + this.getNewLanguage() + ")", () => { this.learnLanguage() });
                                case 6: return new YuJingYouthEventModel("Gained Professional Contacts 1", () => { }); //TODO Professional Contacts X!!!
                            }
                        }
                        break;
                    case 19:
                        {
                            switch (roll) {
                                case 1: return new YuJingYouthEventModel("Gain five assets:  You've gained five additional Assets", () => { character.assets+=5; });
                                case 2: return new YuJingYouthEventModel("Changed social class: During your youth, your family experienced a shift in their economic status (" + SocialClassesHelper.getSocialClass(this.getNewSocialClass()).name + ")", () => { this.changeSocialClass() });
                                case 3: return new YuJingYouthEventModel("Gain two assets:  You've gained two additional Assets", () => { character.assets+=2; });
                                case 4: return new YuJingYouthEventModel("Cube destruction: The Cube used to store your personality has been destroyed. You'll begin play without a Cube.", () => { });
                                case 5: return new YuJingYouthEventModel("Gained Professional Contacts 2", () => { }); //TODO Professional Contacts X!!!
                                case 6: return new YuJingYouthEventModel("Died! Your character died and was resurrected.", () => { character.applyDeath() });
                            }
                        }
                        break;
                    case 20:
                        {
                            var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            return new CompositeYuJingYouthEventModel(roll1, roll2);
                        }
                }
                break;
        }

        /*switch (type) {
            case 1:
            case 2:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Witnessed perjury", () => { });
                        case 2: return new YuJingYouthEventModel("Witnessed a murder", () => { });
                        case 3: return new YuJingYouthEventModel("Witnessed police corruption", () => { });
                        case 4: return new YuJingYouthEventModel("Witnessed assassination", () => { });
                        case 5: return new YuJingYouthEventModel("Witnessed high level corruption", () => { });
                        case 6: return new YuJingYouthEventModel("Witnessed a secret pregnancy", () => { });
                    }
                }
                break;
            case 3:
            case 4:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Witnessed embezzlement", () => { });
                        case 2: return new YuJingYouthEventModel("Witnessed a violent crime", () => { });
                        case 3: return new YuJingYouthEventModel("Witnessed long term abuse", () => { });
                        case 4: return new YuJingYouthEventModel("Witnessed cybercrime", () => { });
                        case 5: return new YuJingYouthEventModel("Witnessed backroom deals being made", () => { });
                        case 6: return new YuJingYouthEventModel("Witnessed political corruption", () => { });
                    }
                }
                break;
            case 5:
            case 6:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Involved in an accident", () => { });
                        case 2: return new YuJingYouthEventModel("Involved in a shooting", () => { });
                        case 3: return new YuJingYouthEventModel("Involved in a transit disaster", () => { });
                        case 4: return new YuJingYouthEventModel("Involved in police action", () => { });
                        case 5: return new YuJingYouthEventModel("Involved in a scandal", () => { });
                        case 6: return new YuJingYouthEventModel("Involved in mass arrests", () => { });
                    }
                }
                break;
            case 7:
            case 8:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Involved in a suicide", () => { });
                        case 2: return new YuJingYouthEventModel("Involved in narcotics sale", () => { });
                        case 3: return new YuJingYouthEventModel("Involved in Resurrection Lottery", () => { });
                        case 4: return new YuJingYouthEventModel("Involved in faking a suicide", () => { });
                        case 5: return new YuJingYouthEventModel("Involved in a cover up", () => { });
                        case 6: return new YuJingYouthEventModel("Involved in smuggling", () => { });
                    }
                }
                break;
            case 9:
            case 10:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Discovered your religion", () => { });
                        case 2: return new YuJingYouthEventModel("Discovered a suicide", () => { });
                        case 3: return new YuJingYouthEventModel("Discovered a fandom", () => { });
                        case 4: return new YuJingYouthEventModel("Discovered a secret", () => { });
                        case 5: return new YuJingYouthEventModel("Discovered an infiltration", () => { });
                        case 6: return new YuJingYouthEventModel("Discovered elite hypocrisy", () => { });
                    }
                }
                break;
            case 11:
            case 12:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Discovered a family secret", () => { });
                        case 2: return new YuJingYouthEventModel("Discovered a body", () => { });
                        case 3: return new YuJingYouthEventModel("Discovered a valuable secret", () => { });
                        case 4: return new YuJingYouthEventModel("Discovered sexual attraction", () => { });
                        case 5: return new YuJingYouthEventModel("Discovered personality tampering", () => { });
                        case 6: return new YuJingYouthEventModel("Discovered a scandal", () => { });
                    }
                }
                break;
            case 13:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Family Change: " + DiceRoller.rollSpecial(6, 1).hits + " Siblings", () => { });
                        case 2: return new YuJingYouthEventModel("Family Change: parents killed", () => { });
                        case 3: return new YuJingYouthEventModel("Family Change: parent walks out", () => { });
                        case 4: return new YuJingYouthEventModel("Family Change: kidnapped", () => { });
                        case 5: return new YuJingYouthEventModel("Family Change: family member resurrected", () => { });
                        case 6: return new YuJingYouthEventModel("Family Change: population relocation", () => { });
                    }
                }
                break;
            case 14:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Family Change: divorce", () => { });
                        case 2: return new YuJingYouthEventModel("Family Change: sibling killed at a young age", () => { });
                        case 3: return new YuJingYouthEventModel("Family Change: gained an extended family", () => { });
                        case 4: return new YuJingYouthEventModel("Family Change: parents incarcerated", () => { });
                        case 5: return new YuJingYouthEventModel("Family Change: family member's Cube corrupted", () => { });
                        case 6: return new YuJingYouthEventModel("Family Change: moved to a new planet", () => { });
                    }
                }
                break;
            case 15:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Media Fad: joined a popular movement", () => { });
                        case 2: return new YuJingYouthEventModel("Media Fad: joined a radical movement", () => { });
                        case 3: return new YuJingYouthEventModel("Media Fad: got involved in life-streaming", () => { });
                        case 4: return new YuJingYouthEventModel("Media Fad: established Arachne nodes", () => { });
                        case 5: return new YuJingYouthEventModel("Media Fad: Maya addiction", () => { });
                        case 6: return new YuJingYouthEventModel("Media Fad: appeared on a popular Maya broadcast", () => { });
                    }
                }
                break;
            case 16:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Succumbed to propaganda", () => { });
                        case 2: return new YuJingYouthEventModel("Succumbed to social exclusion", () => { });
                        case 3: return new YuJingYouthEventModel("Succumbed to a scam", () => { });
                        case 4: return new YuJingYouthEventModel("Succumbed to personality tampering", () => { });
                        case 5: return new YuJingYouthEventModel("Succumbed to boredom", () => { });
                        case 6: return new YuJingYouthEventModel("Succumbed to brainwashing", () => { });
                    }
                }
                break;
            case 17:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Social Contacts: escaped the neighbourhood", () => { });
                        case 2: return new YuJingYouthEventModel("Social Contacts: had brush with opposite social class", () => { });
                        case 3: return new YuJingYouthEventModel("Social Contacts: gained enemy (" + FactionsHelper.getFaction(FactionsHelper.generateFaction(false, true)).name + ")", () => { });
                        case 4: return new YuJingYouthEventModel("Social Contacts: gained contact (" + FactionsHelper.getFaction(FactionsHelper.generateFaction(false, true)).name + ")", () => { });
                        case 5: return new YuJingYouthEventModel("Social Contacts: gained mentor (" + FactionsHelper.getFaction(FactionsHelper.generateFaction(false, true)).name + ")", () => { });
                        case 6: return new YuJingYouthEventModel("Social Contacts: joined Submondo faction", () => { });
                    }
                }
                break;
            case 18:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Gained a one asset debt: You owe someone a debt worth one Asset", () => { });
                        case 2: return new YuJingYouthEventModel("Cube destruction: The Cube used to store your personality has been destroyed. You'll begin play without a Cube.", () => { });
                        case 3: return new YuJingYouthEventModel("Cube theft: Your Cube or the data on your Cube was stolen. Who took it? Do they still have it? What have they done with it?", () => { });
                        case 4: return new YuJingYouthEventModel("Changed social class: During your youth, your family experienced a shift in their economic status (" + SocialClassesHelper.getSocialClass(this.getNewSocialClass()).name + ")", () => { this.changeSocialClass() });
                        case 5: return new YuJingYouthEventModel("Gain one asset:  You've gained one additional Asset", () => { character.assets++; });
                        case 6: return new YuJingYouthEventModel("Defection! You've switched allegiance to a new faction (" + FactionsHelper.getFaction(this.getNewFaction()).name + ")", () => { this.defect(); });
                    }
                }
                break;
            case 19:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Learned a new language (" + this.getNewLanguage() + ")", () => { this.learnLanguage() });
                        case 2: return this.blackmailMaterial();
                        case 3: return new YuJingYouthEventModel("Biological/Chemical weapons: You were exposed to some form of biological weapon. Reduce one attribute of your choice by one point.", () => { });
                        case 4: return new YuJingYouthEventModel("Radical biomodification: You gain a Cosmetic Augmentation 3 (3 bonus Momentum on tests based on appearance or social interaction, but increase repercussion range by +3 outside of the target subculture. Describe how your body has been transformed.", () => { });
                        case 5: return this.debilitatingCondition();
                        case 6: return new YuJingYouthEventModel("Died! Your character died and was resurrected.", () => { character.applyDeath() });
                    }
                }
                break;
            case 20:
                {
                    var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                    var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                    return new CompositeYuJingYouthEventModel(roll1, roll2);
                }
        }*/

        return null;
    }

    getDetailView(event: YuJingYouthEventModel) {
        return (
            event.description.indexOf("Biological/Chemical weapons") > -1 ||
            event.description.indexOf("Died!") > -1
        );
    }

    /*private getDogfaceOrWulverEvent(type: number, roll: number): YuJingYouthEventModel {
        switch (type) {
            case 1:
            case 2:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Survived an Antipode assault", () => { });
                        case 2: return new YuJingYouthEventModel("Survived a wild animal attack", () => { });
                        case 3: return new YuJingYouthEventModel("Survived getting stranded", () => { });
                        case 4: return new YuJingYouthEventModel("Survived a natural disaster", () => { });
                        case 5: return new YuJingYouthEventModel("Survived a border skirmish", () => { });
                        case 6: return new YuJingYouthEventModel("Survived severe drought/famine", () => { });
                    }
                }
                break;
            case 3:
            case 4:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Survived kidnapping", () => { });
                        case 2: return new YuJingYouthEventModel("Survived sabotage", () => { });
                        case 3: return new YuJingYouthEventModel("Survived violent riots", () => { });
                        case 4: return new YuJingYouthEventModel("Survived an accident", () => { });
                        case 5: return new YuJingYouthEventModel("Survived a shooting", () => { });
                        case 6: return new YuJingYouthEventModel("Survived a Submondo raid", () => { });
                    }
                }
                break;
            case 5:
            case 6:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Witnessed perjury", () => { });
                        case 2: return new YuJingYouthEventModel("Witnessed a murder", () => { });
                        case 3: return new YuJingYouthEventModel("Witnessed assassination", () => { });
                        case 4: return new YuJingYouthEventModel("Witnessed political corruption", () => { });
                        case 5: return new YuJingYouthEventModel("Witnessed a violent crime", () => { });
                        case 6: return new YuJingYouthEventModel("Witnessed a long-term abuse", () => { });
                    }
                }
                break;
            case 7:
            case 8:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Witnessed betrayal", () => { });
                        case 2: return new YuJingYouthEventModel("Witnessed bigotry", () => { });
                        case 3: return new YuJingYouthEventModel("Witnessed an Antipode attack", () => { });
                        case 4: return new YuJingYouthEventModel("Witnessed hypocrisy", () => { });
                        case 5: return new YuJingYouthEventModel("Witnessed selfless bravery", () => { });
                        case 6: return new YuJingYouthEventModel("Witnessed heroic sacrifice", () => { });
                    }
                }
                break;
            case 9:
            case 10:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Involved in a cover-up", () => { });
                        case 2: return new YuJingYouthEventModel("Involved in smuggling", () => { });
                        case 3: return new YuJingYouthEventModel("Involved in amateur Dog-Bowl", () => { });
                        case 4: return new YuJingYouthEventModel("Involved in Dog Nation protests", () => { });
                        case 5: return new YuJingYouthEventModel("Involved in charity work", () => { });
                        case 6: return new YuJingYouthEventModel("Involved in gang activity", () => { });
                    }
                }
                break;
            case 11:
            case 12:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Discovered religion", () => { });
                        case 2: return new YuJingYouthEventModel("Discovered scientific curiosity", () => { });
                        case 3: return new YuJingYouthEventModel("Discovered artistic talent", () => { });
                        case 4: return new YuJingYouthEventModel("Discovered sexual attraction", () => { });
                        case 5: return new YuJingYouthEventModel("Discovered a dead body", () => { });
                        case 6: return new YuJingYouthEventModel("Discovered archeological ruins", () => { });
                    }
                }
                break;
            case 13:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Family Change: parents (re)marries", () => { });
                        case 2: return new YuJingYouthEventModel("Family Change: parent(s) disappear", () => { });
                        case 3: return new YuJingYouthEventModel("Family Change: parent(s) killed", () => { });
                        case 4: return new YuJingYouthEventModel("Family Change: parent walks out", () => { });
                        case 5: return new YuJingYouthEventModel("Family Change: parents incarcerated", () => { });
                        case 6: return new YuJingYouthEventModel("Family Change: parent(s) sent to front", () => { });
                    }
                }
                break;
            case 14:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Family Change: Wulver sibling born", () => { });
                        case 2: return new YuJingYouthEventModel("Family Change: Dogface sibling born", () => { });
                        case 3: return new YuJingYouthEventModel("Family Change: adopted sibling", () => { });
                        case 4: return new YuJingYouthEventModel("Family Change: " + DiceRoller.rollSpecial(8, 1).hits + " new Siblings", () => { });
                        case 5: return new YuJingYouthEventModel("Family Change: divorce", () => { });
                        case 6: return new YuJingYouthEventModel("Family Change: moved to new nation", () => { });
                    }
                }
                break;
            case 15:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Succumbed to Galactic propaganda", () => { });
                        case 2: return new YuJingYouthEventModel("Succumbed to toxic nationalism", () => { });
                        case 3: return new YuJingYouthEventModel("Succumbed to despair", () => { });
                        case 4: return new YuJingYouthEventModel("Succumbed to mental illness", () => { });
                        case 5: return new YuJingYouthEventModel("Succumbed to peer pressure", () => { });
                        case 6: return new YuJingYouthEventModel("Succumbed to loneliness", () => { });
                    }
                }
                break;
            case 16:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Social Contacts: Made a friend in opposite social class", () => { });
                        case 2: return new YuJingYouthEventModel(`Social Contacts: Gained mentor (${BirthPlacesHelper.generateBirthPlace(Faction.Ariadna, false).name})`, () => { });
                        case 3: return new YuJingYouthEventModel(`Social Contacts: Gained contact (${BirthPlacesHelper.generateBirthPlace(Faction.Ariadna, false).name})`, () => { });
                        case 4: return new YuJingYouthEventModel(`Social Contacts: Galactic contact (${FactionsHelper.getFaction(FactionsHelper.generateFaction(false, true)).name})`, () => { });
                        case 5: return new YuJingYouthEventModel("Social Contacts: Submondo contact", () => { });
                        case 6: return new YuJingYouthEventModel("Social Contacts: Mercenary contact", () => { });
                    }
                }
                break;
            case 17:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Entrusted with an heirloom", () => { });
                        case 2: return new YuJingYouthEventModel("Entrusted with a commendation", () => { });
                        case 3: return new YuJingYouthEventModel("Entrusted with a task", () => { });
                        case 4: return new YuJingYouthEventModel("Entrusted with a legacy", () => { });
                        case 5: return new YuJingYouthEventModel("Entrusted with a secret", () => { });
                        case 6: return new YuJingYouthEventModel("Entrusted with a Cube", () => { });
                    }
                }
                break;
            case 18:
                {
                    switch (roll) {
                        case 1: 
                        case 2: return new YuJingYouthEventModel("Gained a 1 Asset debt", () => { });
                        case 3: return new YuJingYouthEventModel("Gained a Cube - no strings", () => { });
                        case 4: return new YuJingYouthEventModel("Gained a Cube - strings", () => { });
                        case 5: return new YuJingYouthEventModel(`Gained a ${DiceRoller.rollSpecial(3, 0).hits} Asset debt`, () => { });
                        case 6: return new YuJingYouthEventModel(`Gained a ${DiceRoller.rollSpecial(5, 0).hits} Asset debt`, () => { });
                    }
                }
                break;
            case 19:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel(`Learned a Galactic language (${this.getNewLanguage()})`, () => { this.learnLanguage(); });
                        case 2: return new YuJingYouthEventModel(`Learned an Ariadnan language (${this.learnFactionLanguage(Faction.Ariadna)})`, () => { this.learnLanguage(); });
                        case 3: return this.blackmailMaterial();
                        case 4: return this.blackmailAriadnan();
                        case 5: return this.seriousGeneticIllness();
                        case 6: return this.vigorPoison(5, 1);
                    }
                }
                break;
            case 20:
                {
                    var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                    var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                    return new CompositeYuJingYouthEventModel(roll1, roll2);
                }
        }

        return null;
    }*/

    /*private getAntipodeEvent(type: number, roll: number): YuJingYouthEventModel {
        switch (type) {
            case 1:
            case 2:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Survived an Ariadnan assault", () => { });
                        case 2: return new YuJingYouthEventModel("Survived a wild animal attack", () => { });
                        case 3: return new YuJingYouthEventModel("Survived getting stranded", () => { });
                        case 4: return new YuJingYouthEventModel("Survived a natural disaster", () => { });
                        case 5: return new YuJingYouthEventModel("Survived a border skirmish", () => { });
                        case 6: return new YuJingYouthEventModel("Survived severe drought/famine", () => { });
                    }
                }
                break;
            case 3:
            case 4:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Survived infighting", () => { });
                        case 2: return new YuJingYouthEventModel("Survived Ariadnan sabotage", () => { });
                        case 3: return new YuJingYouthEventModel("Survived a Warlord coup", () => { });
                        case 4: return new YuJingYouthEventModel("Survived an accident", () => { });
                        case 5: return new YuJingYouthEventModel("Survived an excursion to Ariadna", () => { });
                        case 6: return new YuJingYouthEventModel("Survived Ariadnans fighting galactics", () => { });
                    }
                }
                break;
            case 5:
            case 6:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Witnessed a kidnapping", () => { });
                        case 2: return new YuJingYouthEventModel("Witnessed a murder", () => { });
                        case 3: return new YuJingYouthEventModel("Witnessed broken vows", () => { });
                        case 4: return new YuJingYouthEventModel("Witnessed Mind-Shock", () => { });
                        case 5: return new YuJingYouthEventModel("Witnessed despair", () => { });
                        case 6: return new YuJingYouthEventModel("Witnessed indescribable beauty", () => { });
                    }
                }
                break;
            case 7:
            case 8:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Witnessed betrayal", () => { });
                        case 2: return new YuJingYouthEventModel("Witnessed bigotry", () => { });
                        case 3: return new YuJingYouthEventModel("Witnessed a Galactic attack", () => { });
                        case 4: return new YuJingYouthEventModel("Witnessed hypocrisy", () => { });
                        case 5: return new YuJingYouthEventModel("Witnessed selfless bravery", () => { });
                        case 6: return new YuJingYouthEventModel("Witnessed heroic sacrifice", () => { });
                    }
                }
                break;
            case 9:
            case 10:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Involved in a raid", () => { });
                        case 2: return new YuJingYouthEventModel("Involved in an attack", () => { });
                        case 3: return new YuJingYouthEventModel("Involved in keeping a secret", () => { });
                        case 4: return new YuJingYouthEventModel("Involved in spying on Ariadnans", () => { });
                        case 5: return new YuJingYouthEventModel("Involved in religious rites", () => { });
                        case 6: return new YuJingYouthEventModel("Involved in a coup", () => { });
                    }
                }
                break;
            case 11:
            case 12:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Discovered religion", () => { });
                        case 2: return new YuJingYouthEventModel("Discovered a stray human", () => { });
                        case 3: return new YuJingYouthEventModel("Discovered artistic talent", () => { });
                        case 4: return new YuJingYouthEventModel("Discovered sexual attraction", () => { });
                        case 5: return new YuJingYouthEventModel("Discovered a body", () => { });
                        case 6: return new YuJingYouthEventModel("Discovered archeological ruins", () => { });
                    }
                }
                break;
            case 13:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Family Change: parental Trinary dissolves", () => { });
                        case 2: return new YuJingYouthEventModel("Family Change: parental Trinary abandons you", () => { });
                        case 3: return new YuJingYouthEventModel("Family Change: parental Trinary killed", () => { });
                        case 4: return new YuJingYouthEventModel("Family Change: parental Trinary suffers Mind-Shock", () => { });
                        case 5: return new YuJingYouthEventModel("Family Change: parental Trinary kidnapped", () => { });
                        case 6: return new YuJingYouthEventModel("Family Change: parental Trinary goes missing", () => { });
                    }
                }
                break;
            case 14:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Family Change: one parent sires a Dogface", () => { });
                        case 2: return new YuJingYouthEventModel("Family Change: parental Trinary sires new litter", () => { });
                        case 3: return new YuJingYouthEventModel("Family Change: littermate dies", () => { });
                        case 4: return new YuJingYouthEventModel("Family Change: littermate can't form Trinary", () => { });
                        case 5: return new YuJingYouthEventModel("Family Change: littermate kidnapped", () => { });
                        case 6: return new YuJingYouthEventModel("Family Change: littermate returns in Assault Pack", () => { });
                    }
                }
                break;
            case 15:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Succumbed to illness", () => { });
                        case 2: return new YuJingYouthEventModel("Succumbed to savage urges", () => { });
                        case 3: return new YuJingYouthEventModel("Succumbed to despair", () => { });
                        case 4: return new YuJingYouthEventModel("Succumbed to mental illness", () => { });
                        case 5: return new YuJingYouthEventModel("Succumbed to xenophobia", () => { });
                        case 6: return new YuJingYouthEventModel("Succumbed to loneliness", () => { });
                    }
                }
                break;
            case 16:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel(`Your First Trinary: made a friend in Ariadna (${BirthPlacesHelper.generateBirthPlace(Faction.Ariadna, false).name})`, () => { });
                        case 2: return new YuJingYouthEventModel(`Your First Trinary: distinguished itself during a hunt`, () => { });
                        case 3: return new YuJingYouthEventModel(`Your First Trinary: cannot agree on anything`, () => { });
                        case 4: return new YuJingYouthEventModel(`Your First Trinary: captured a human`, () => { });
                        case 5: return new YuJingYouthEventModel("Your First Trinary: created notable artwork", () => { });
                        case 6: return new YuJingYouthEventModel("Your First Trinary: was barely sapient", () => { });
                    }
                }
                break;
            case 17:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Your First Trinary: was paranoid", () => { });
                        case 2: return new YuJingYouthEventModel("Your First Trinary: longed for adventure", () => { });
                        case 3: return new YuJingYouthEventModel("Your First Trinary: fears change", () => { });
                        case 4: return new YuJingYouthEventModel("Your First Trinary: continues a great legacy", () => { });
                        case 5: return new YuJingYouthEventModel("Your First Trinary: bears a secret memory", () => { });
                        case 6: return new YuJingYouthEventModel("Your First Trinary: rejected you", () => { });
                    }
                }
                break;
            case 18:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel("Gained 2 Assets", () => { character.assets += 2; });
                        case 2: return new YuJingYouthEventModel("Gained 1 Asset", () => { character.assets++; });
                        case 3:
                        case 4: return this.vigorPoison(1, 0);
                        case 5: return new YuJingYouthEventModel(`You spent some time in the Nomad faction. You have a contact/enemy in that faction and learned a new language (${this.learnFactionLanguage(Faction.Nomads)})`, () => { this.learnLanguage(); });
                        case 6: return new YuJingYouthEventModel(`You spent some time in the Ariadna faction. You have a contact/enemy in that faction and learned a new language (${this.learnFactionLanguage(Faction.Ariadna)})`, () => { this.learnLanguage(); });
                    }
                }
                break;
            case 19:
                {
                    switch (roll) {
                        case 1: return new YuJingYouthEventModel(`Learned an Ariadnan language (${this.learnFactionLanguage(Faction.Ariadna)})`, () => { this.learnLanguage(); });
                        case 2: return new YuJingYouthEventModel(`Learned a Galactic language (${this.getNewLanguage()})`, () => { this.learnLanguage(); });
                        case 3: return this.vigorPoison(2, 0);
                        case 4: return this.blackmailAriadnan();
                        case 5: return this.seriousGeneticIllness();
                        case 6: return this.vigorPoison(4, 1);
                    }
                }
                break;
            case 20:
                {
                    var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                    var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                    return new CompositeYuJingYouthEventModel(roll1, roll2);
                }
        }

        return null;
    }*/

    private changeSocialClass() {
        var event = character.youthEvent;
        var s = event.description.indexOf("(") + 1;
        var e = event.description.indexOf(")");
        var cls = event.description.substr(s, e - s);

        var soc = SocialClassesHelper.getSocialClassByName(cls);
        character.socialClass = soc;

        var socCls = SocialClassesHelper.getSocialClass(soc);
        character.earnings = socCls.earnings;
    }

    private getNewSocialClass() {
        var newSocialClass = SocialClassesHelper.generateSocialClass();

        while (character.socialClass === newSocialClass) {
            newSocialClass = SocialClassesHelper.generateSocialClass();
        }

        return newSocialClass;
    }

    private defect() {
        var event = character.youthEvent;
        var start = event.description.indexOf("(") + 1;
        var end = event.description.indexOf(")");
        var fac = event.description.substring(start, end);

        var faction = FactionsHelper.getFactionByName(fac);
        character.heritage = character.faction;
        character.faction = faction;
    }

    private getNewFaction() {
        var newFaction = character.faction;

        while (character.faction === newFaction) {
            newFaction = FactionsHelper.generateFaction(false, true);
        }

        return newFaction;
    }

    private learnLanguage() {
        var e = character.youthEvent;
        var start = e.description.indexOf("(") + 1;
        var end = e.description.indexOf(")");
        var lang = e.description.substr(start, end - start);

        character.addLanguage(lang);
    }

    private learnFactionLanguage(faction: Faction) {
        return BirthPlacesHelper.generateSecondaryLanguage(faction);
    }

    private getNewLanguage() {
        var newLanguage = BirthPlacesHelper.generateRandomLanguage(character.faction, true, true);

        while (character.hasLanguage(newLanguage[0])) {
            newLanguage = BirthPlacesHelper.generateRandomLanguage(character.faction, true, true);
        }

        return newLanguage[0];
    }

    private blackmailMaterial() {
        var faction1 = FactionsHelper.generateFaction(false, true);
        var faction2 = FactionsHelper.generateFaction(false, true);

        while (faction2 === faction1) {
            faction2 = FactionsHelper.generateFaction(false, true);
        }

        var faction1Name = FactionsHelper.getFaction(faction1).name;
        var faction2Name = FactionsHelper.getFaction(faction2).name;

        return new YuJingYouthEventModel(`Gained Blackmail Material: You have been given proof that the ${faction1Name} faction has committed misdeeds against the ${faction2Name} faction. Either party will grant a favour for the evidence.`, () => { });
    }

    private blackmailAriadnan() {
        var faction1 = BirthPlacesHelper.generateBirthPlace(Faction.Ariadna, false);
        var faction2 = FactionsHelper.generateFaction(false, true);

        return new YuJingYouthEventModel(`Gained Blackmail Material: You have been given proof that a party from ${faction1.name} has committed misdeeds against the ${FactionsHelper.getFaction(faction2).name} faction. Either party will grant a favour for the evidence.`, () => { });
    }

    private debilitatingCondition() {
        var cost = DiceRoller.rollSpecial(4, 6);
        return new YuJingYouthEventModel(`Debilitating Condition: Whether by genetics, illness, or injury, you suffer from a condition that seriously hampers your mobility. Increase the difficulty of all movement-related tests by one step. A cure is possible, but it’s expensive and will cost ${cost.hits} Assets.`, () => { });
    }

    private vigorPoison(dice: number, bonus: number) {
        var cost = DiceRoller.rollSpecial(4, 4);
        return new YuJingYouthEventModel(`Natural or manufactured, you were were badly poisoned and your body never fully recovered. Suffer the Fatigued condition, and reduce your Vigour by ` + {bonus} + `, to a minimum of 2. The experience may have an upside, increase your Resolve by +1 for every Effect rolled. A cure exists, but it costs ${cost.hits} Assets.`, () => { this.applyVigorPoison(dice, bonus); });
    }

    private applyVigorPoison(dice: number, bonus: number) {
        var reduction = DiceRoller.rollSpecial(dice, bonus);

        character.vigourReduction -= bonus;
        character.resolveReduction += reduction.special;
    }
}

export const YuJingYouthEventsHelper = new YouthEvents();