import {DiceRoller} from './diceRoller';
import {Faction, FactionsHelper} from './factions';
import {SocialClassesHelper} from './socialClasses';
import {BirthPlacesHelper, HeritageTraits} from './birthPlaces';
import {character} from '../common/character';
import { Education } from './educations';
import { CompositeYouthEventModel, YouthEventModel } from './youthEvents';

class YuJingYouthEvents {
    generateEvent(): YouthEventModel {
        var type = Math.floor(Math.random() * 20) + 1;
        var roll = Math.floor(Math.random() * 6) + 1;
        var event = this.getEvent(type, roll);
        return event;
    }

    getEvent(type: number, roll: number): YouthEventModel {
        //console.log("YuJingYouthEvent for "+character.heritageTrait+"("+type+","+roll+")");
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
                                case 1: return new YouthEventModel("Witnessed forced relocation", () => { });
                                case 2: return new YouthEventModel("Witnessed a murder", () => { });
                                case 3: return new YouthEventModel("Witnessed a kidnapping", () => { });
                                case 4: return new YouthEventModel("Witnessed treason", () => { });
                                case 5: return new YouthEventModel("Witnessed abuse of power", () => { });
                                case 6: return new YouthEventModel("Witnessed unearned privilege", () => { });
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
                                case 1: return new YouthEventModel("Endured bigotry", () => { });
                                case 2: return new YouthEventModel("Endured a natural disaster", () => { });
                                case 3: return new YouthEventModel("Endured slum housing", () => { });
                                case 4: return new YouthEventModel("Endured mob violence", () => { });
                                case 5: return new YouthEventModel("Endured systematic exclusion", () => { });
                                case 6: return new YouthEventModel("Endured bullying", () => { });
                            }
                        }
                        break;
                    case 11:
                    case 12:
                    case 13:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Involved in gangs", () => { });
                                case 2: return new YouthEventModel("Involved in Hexahedron surveillance", () => { });
                                case 3: return new YouthEventModel("Involved in corporate sabotage", () => { });
                                case 4: return new YouthEventModel("Involved in drug trafficking", () => { });
                                case 5: return new YouthEventModel("Involved in gifted programs", () => { });
                                case 6: return new YouthEventModel("Involved in fight clubs", () => { });
                            }
                        }
                        break;
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Succumbed to propaganda", () => { });
                                case 2: return new YouthEventModel("Succumbed to social exclusion", () => { });
                                case 3: return new YouthEventModel("Succumbed to despair", () => { });
                                case 4: return new YouthEventModel("Succumbed to isolation", () => { });
                                case 5: return new YouthEventModel("Succumbed to untreated mental illness", () => { });
                                case 6: return new YouthEventModel("Succumbed to terror", () => { });
                            }
                        }
                        break;
                    case 18:
                    {
                        switch (roll) {
                            case 1: return new YouthEventModel("Gained a one asset debt: You owe someone a debt worth one Asset", () => { });
                            case 2: return new YouthEventModel("Changed social class: During your youth, your family experienced a shift in their economic status (" + SocialClassesHelper.getSocialClass(this.getNewSocialClass()).name + ")", () => { this.changeSocialClass() });
                            case 3: return new YouthEventModel("Gained a two asset debt: You owe someone a debt worth two Assets", () => { });
                            case 4: return new YouthEventModel("Cube destruction: The Cube used to store your personality has been destroyed. You'll begin play without a Cube.", () => { });
                            case 5: return new YouthEventModel("Gained Professional Contact 1", () => { }); //TODO Professional Contact X!!!
                            case 6: return new YouthEventModel("Gain one asset:  You've gained one additional Asset", () => { character.assets++; });
                        }
                    }
                    break;
                    case 19:
                        {
                            switch (roll) {
                                case 1: return new YouthEventModel("Gained a three asset debt: You owe someone a debt worth three Assets", () => { });
                                case 2: return this.blackmailMaterial();
                                case 3: return this.debilitatingCondition();
                                case 4: return this.vigorPoison(0, 3);
                                case 5: return this.blackmailMaterial();
                                case 6: return new YouthEventModel("Died! Your character died and was resurrected.", () => { character.applyDeath() });
                            }
                        }
                        break;
                    case 20:
                        {
                            var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            return new CompositeYouthEventModel(roll1, roll2);
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
                                case 1: return new YouthEventModel("Witnessed police corruption", () => { });
                                case 2: return new YouthEventModel("Witnessed abuse of authority", () => { });
                                case 3: return new YouthEventModel("Witnessed a murder", () => { });
                                case 4: return new YouthEventModel("Witnessed Kempeitai operations", () => { });
                                case 5: return new YouthEventModel("Witnessed elite hypocrisy", () => { });
                                case 6: return new YouthEventModel("Witnessed uncommon kindness", () => { });
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
                                case 1: return new YouthEventModel("Involved in organised crime", () => { });
                                case 2: return new YouthEventModel("Involved in forced relocation", () => { });
                                case 3: return new YouthEventModel("Involved in ethnic profiling", () => { });
                                case 4: return new YouthEventModel("Involved in an accident", () => { });
                                case 5: return new YouthEventModel("Involved in mass arrests", () => { });
                                case 6: return new YouthEventModel("Involved in Otaku subculture", () => { });
                            }
                        }
                        break;
                    case 11:
                    case 12:
                    case 13:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Family Change: parent walks out", () => { });
                                case 2: return new YouthEventModel("Family Change: parents incarcerated", () => { });
                                case 3: return new YouthEventModel("Family Change: parents divorced", () => { });
                                case 4: return new YouthEventModel("Family Change: family member defects", () => { });
                                case 5: return new YouthEventModel("Family Change: family member dies", () => { });
                                case 6: return new YouthEventModel("Family Change: sibling goes missing", () => { });
                            }
                        }
                        break;
                    case 14:
                    case 15:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Discovered Otaku subculture", () => { });
                                case 2: return new YouthEventModel("Discovered sexual attraction", () => { });
                                case 3: return new YouthEventModel("Discovered religion", () => { });
                                case 4: return new YouthEventModel("Discovered Hao lù cronyism", () => { });
                                case 5: return new YouthEventModel("Discovered street racing", () => { });
                                case 6: return new YouthEventModel("Discovered corruption in local officials", () => { });
                            }
                        }
                        break;
                    case 16:
                    case 17:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Social Contacts: gained Yakuza contact", () => { });
                                case 2: return new YouthEventModel("Social Contacts: gained Otaku contacts", () => { });
                                case 3: return new YouthEventModel("Social Contacts: gained PanOceanian contact or rival", () => { });
                                case 4: return new YouthEventModel("Social Contacts: escaped the neighbourhood", () => { });
                                case 5: return new YouthEventModel("Social Contacts: had brush with opposite social class", () => { });
                                case 6: return new YouthEventModel("Social Contacts: made a university contact", () => { });
                            }
                        }
                        break;
                    case 18:
                    case 19:
                        {
                            switch (roll) {
                                case 1: return new YouthEventModel("Gained a two asset debt: You owe someone a debt worth two Assets", () => { });
                                case 2: return this.blackmailMaterial();
                                case 3: return new YouthEventModel("You’re accepted into the rigorous meiyo sheiken honour tests. You can freely select Military Training in Decision Six.", () => { character.freeEducations.push(Education.Military_Training);}); //TODO Free Military Training
                                case 4: return this.vigorPoison(0, 3);
                                case 5: return new YouthEventModel("Gained a three asset debt: You owe someone a debt worth three Assets", () => { });
                                case 6: return new YouthEventModel("Died! Your character died and was resurrected.", () => { character.applyDeath() });
                            }
                        }
                        break;
                    case 20:
                        {
                            var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            return new CompositeYouthEventModel(roll1, roll2);
                        }
                }
                break;
            case HeritageTraits.Guanxi:
            case HeritageTraits.Imperial:
                switch(type) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Witnessed inspiring loyalty", () => { });
                                case 2: return new YouthEventModel("Witnessed perjury", () => { });
                                case 3: return new YouthEventModel("Witnessed assassination", () => { });
                                case 4: return new YouthEventModel("Witnessed hard work rewarded", () => { });
                                case 5: return new YouthEventModel("Witnessed a violent crime", () => { });
                                case 6: return new YouthEventModel("Witnessed backroom politics", () => { });
                            }
                        }
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Involved in a scandal", () => { });
                                case 2: return new YouthEventModel("Involved in a children’s Mayaseries", () => { });
                                case 3: return new YouthEventModel("Involved in a prestigious competition", () => { });
                                case 4: return new YouthEventModel("Involved in an accident", () => { });
                                case 5: return new YouthEventModel("Involved in a major news event", () => { });
                                case 6: return new YouthEventModel("Involved in resurrection lottery", () => { });
                            }
                        }
                        break;
                    case 10:
                    case 11:
                    case 12:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Family Change: divorce", () => { });
                                case 2: return new YouthEventModel("Family Change: " + DiceRoller.rollSpecial(6, 1).hits + " siblings", () => { });
                                case 3: return new YouthEventModel("Family Change: sibling kidnaped", () => { });
                                case 4: return new YouthEventModel("Family Change: parents promoted", () => { });
                                case 5: return new YouthEventModel("Family Change: family member resurrected", () => { });
                                case 6: return new YouthEventModel("Family Change: family member killed", () => { });
                            }
                        }
                        break;
                    case 13:
                    case 14:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Social Contacts: had brush with opposite social class", () => { });
                                case 2: return new YouthEventModel("Social Contacts: gained Triad contacts", () => { });
                                case 3: return new YouthEventModel("Social Contacts: encountered a young Imperial heir", () => { });
                                case 4: return new YouthEventModel("Social Contacts: gained PanOceanian enemy", () => { });
                                case 5: return new YouthEventModel("Social Contacts: gained Party rival", () => { });
                                case 6: return new YouthEventModel("Social Contacts: made a university contact", () => { });
                            }
                        }
                        break;
                    case 15:
                    case 16:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Discovered Secret Ancestry: you are adopted", () => { });
                                case 2: return new YouthEventModel("Discovered Secret Ancestry: you are Japanese", () => { });
                                case 3: return new YouthEventModel("Discovered Secret Ancestry: you are Han Chinese", () => { });
                                case 4: return new YouthEventModel("Discovered Secret Ancestry: you are a child of a famous traitor", () => { });
                                case 5: return new YouthEventModel("Discovered Secret Ancestry: you are PanOceanian", () => { });
                                case 6: return new YouthEventModel("Discovered Secret Ancestry: you are a child of a criminal", () => { });
                            }
                        }
                        break;
                    case 17:
                    case 18:
                    case 19:
                        {
                            switch (roll) {
                                case 1: return new YouthEventModel("Learned a new language (" + this.getNewLanguage() + ")", () => { this.learnLanguage() });
                                case 2: return this.blackmailMaterial();
                                case 3: return this.vigorPoison(0, 1);
                                case 4: return new YouthEventModel("Gained a one asset debt: You owe someone a debt worth one Asset", () => { });
                                case 5: return new YouthEventModel("Defection! You've switched allegiance to a new faction (" + FactionsHelper.getFaction(this.getNewFaction()).name + ")", () => { this.defect(); });
                                case 6: return new YouthEventModel("Died! Your character died and was resurrected.", () => { character.applyDeath() });
                            }
                        }
                        break;
                    case 20:
                        {
                            var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            return new CompositeYouthEventModel(roll1, roll2);
                        }
                }
                break;
            case HeritageTraits.Chinese:
            case HeritageTraits.Party:
                switch(type) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Witnessed the Emperor", () => { });
                                case 2: return new YouthEventModel("Witnessed bigotry", () => { });
                                case 3: return new YouthEventModel("Witnessed Tatenokai attack", () => { });
                                case 4: return new YouthEventModel("Witnessed hypocrisy", () => { });
                                case 5: return new YouthEventModel("Witnessed PanOceanian sabotage", () => { });
                                case 6: return new YouthEventModel("Witnessed heroic sacrifice", () => { });
                            }
                        }
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Discovered religion", () => { });
                                case 2: return new YouthEventModel("Discovered competitive martial arts", () => { });
                                case 3: return new YouthEventModel("Discovered classical artistic talent", () => { });
                                case 4: return new YouthEventModel("Discovered a secret", () => { });
                                case 5: return new YouthEventModel("Discovered a scandal", () => { });
                                case 6: return new YouthEventModel("Discovered elite hypocrisy", () => { });
                            }
                        }
                        break;
                    case 10:
                    case 11:
                    case 12:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Inherited a warrior’s legacy", () => { });
                                case 2: return new YouthEventModel("Inherited family debts", () => { });
                                case 3: return new YouthEventModel("Inherited weighty expectations", () => { });
                                case 4: return new YouthEventModel("Inherited ceremonial tools", () => { });
                                case 5: return new YouthEventModel("Inherited head of household status", () => { });
                                case 6: return new YouthEventModel("Inherited a cabin in the Hăimen High Quarters", () => { });
                            }
                        }
                        break;
                    case 13:
                    case 14:
                    case 15:
                        {
                            switch(roll) {
                                case 1: return new YouthEventModel("Social Contacts: family worked with off-world ambassador", () => { });
                                case 2: return new YouthEventModel("Social Contacts: had brush with opposite social class", () => { });
                                case 3: return new YouthEventModel("Social Contacts: befriended an Imperial heir", () => { });
                                case 4: return new YouthEventModel("Social Contacts: gained PanOceanian enemy", () => { });
                                case 5: return new YouthEventModel("Social Contacts: gained O-12 contact", () => { });
                                case 6: return new YouthEventModel("Social Contacts: gained Corporation contact", () => { });
                            }
                        }
                        break;
                    case 16:
                    case 17:
                    case 18:
                        {
                            switch (roll) {
                                case 1: return new YouthEventModel("Gained a one asset debt: You owe someone a debt worth one Asset", () => { });
                                case 2: return this.blackmailMaterial();
                                case 3: return this.vigorPoison(0, 3);
                                case 4: return new YouthEventModel("Gain three assets:  You've gained three additional Assets", () => { character.assets+=3; });
                                case 5: return new YouthEventModel("Learned a new language (" + this.getNewLanguage() + ")", () => { this.learnLanguage() });
                                case 6: return new YouthEventModel("Gained Professional Contacts 1", () => { }); //TODO Professional Contacts X!!!
                            }
                        }
                        break;
                    case 19:
                        {
                            switch (roll) {
                                case 1: return new YouthEventModel("Gain five assets:  You've gained five additional Assets", () => { character.assets+=5; });
                                case 2: return new YouthEventModel("Changed social class: During your youth, your family experienced a shift in their economic status (" + SocialClassesHelper.getSocialClass(this.getNewSocialClass()).name + ")", () => { this.changeSocialClass() });
                                case 3: return new YouthEventModel("Gain two assets:  You've gained two additional Assets", () => { character.assets+=2; });
                                case 4: return new YouthEventModel("Cube destruction: The Cube used to store your personality has been destroyed. You'll begin play without a Cube.", () => { });
                                case 5: return new YouthEventModel("Gained Professional Contacts 2", () => { }); //TODO Professional Contacts X!!!
                                case 6: return new YouthEventModel("Died! Your character died and was resurrected.", () => { character.applyDeath() });
                            }
                        }
                        break;
                    case 20:
                        {
                            var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                            return new CompositeYouthEventModel(roll1, roll2);
                        }
                }
                break;
        }

        return null;
    }

    getDetailView(event: YouthEventModel) {
        return (
            event.description.indexOf("Biological/Chemical weapons") > -1 ||
            event.description.indexOf("Died!") > -1
        );
    }

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

        return new YouthEventModel(`Gained Blackmail Material: You have been given proof that the ${faction1Name} faction has committed misdeeds against the ${faction2Name} faction. Either party will grant a favour for the evidence.`, () => { });
    }

    private blackmailAriadnan() {
        var faction1 = BirthPlacesHelper.generateBirthPlace(Faction.Ariadna, false);
        var faction2 = FactionsHelper.generateFaction(false, true);

        return new YouthEventModel(`Gained Blackmail Material: You have been given proof that a party from ${faction1.name} has committed misdeeds against the ${FactionsHelper.getFaction(faction2).name} faction. Either party will grant a favour for the evidence.`, () => { });
    }

    private debilitatingCondition() {
        var cost = DiceRoller.rollSpecial(4, 6);
        return new YouthEventModel(`Debilitating Condition: Whether by genetics, illness, or injury, you suffer from a condition that seriously hampers your mobility. Increase the difficulty of all movement-related tests by one step. A cure is possible, but it’s expensive and will cost ${cost.hits} Assets.`, () => { });
    }

    private vigorPoison(dice: number, bonus: number) {
        var cost = DiceRoller.rollSpecial(4, 4);
        return new YouthEventModel(`Natural or manufactured, you were were badly poisoned and your body never fully recovered. Suffer the Fatigued condition, and reduce your Vigour by ` + {bonus} + `, to a minimum of 2. The experience may have an upside, increase your Resolve by +1 for every Effect rolled. A cure exists, but it costs ${cost.hits} Assets.`, () => { this.applyVigorPoison(dice, bonus); });
    }

    private applyVigorPoison(dice: number, bonus: number) {
        var reduction = DiceRoller.rollSpecial(dice, bonus);

        character.vigourReduction -= bonus;
        character.resolveReduction += reduction.special;
    }
}

export const YuJingYouthEventsHelper = new YuJingYouthEvents();