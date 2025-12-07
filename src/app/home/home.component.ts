import { Component } from '@angular/core';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  COLORS: any = {
  Psychic: '#f8a5c2',
  Fighting: '#f0932b',
  Fairy: '#c44569',
  Normal: '#f6e58d',
  Grass: '#badc58',
  Metal: '#95afc0',
  Water: '#3dc1d3',
  Lightning: '#f9ca24',
  Darkness: '#574b90',
  Colorless: '#ffffff',
  Fire: '#eb4d4b',
};


  pokedex: any[] = [];
  isPopupOpen = false;

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  addToPokedex(card: any) {
    this.pokedex.push(card);
    this.isPopupOpen = false; 
  }

  remove(card: any) {
    this.pokedex = this.pokedex.filter(p => p.id !== card.id);
  }

  remove_all() {
    this.pokedex = [];
  }

getHpWidth(hp: any): number {
  if (!hp) return 0;
  const hpVal = parseInt(hp);
  if (isNaN(hpVal)) return 0;
  if (hpVal > 100) return 100;
  return hpVal;
}

getStrWidth(attacks: any[]): number {
  if (!Array.isArray(attacks)) return 0;
  return Math.min(attacks.length * 50, 100);
}

getWeakWidth(weaknesses: any[]): number {
  if (!Array.isArray(weaknesses)) return 0;
  return Math.min(weaknesses.length * 100, 100);
}

  getHpNumber(hp: any): number {
    if (!hp) return 0;
    const hpVal = parseInt(hp);
    if (isNaN(hpVal)) return 0;
    return Math.min(hpVal, 100);
  }
  getDamageValue(attacks: any[]): number {
    if (!Array.isArray(attacks) || attacks.length === 0) return 0;
    let total = 0;
    for (const a of attacks) {
      if (!a || !a.damage) continue;
      const m = (a.damage + '').match(/\d+/);
      if (m) total += parseInt(m[0], 10);
    }
    return total;
  }

  getDamagePercent(attacks: any[]): number {
    const dmg = this.getDamageValue(attacks);
    return Math.min(Math.round((dmg / 100) * 100), 100);
  }

  getWeakCount(weaknesses: any[]): number {
    if (!Array.isArray(weaknesses)) return 0;
    return weaknesses.length ;
  }

  getHappiness(card: any): number {
    if (!card) return 0;

    const hpNum = this.getHpNumber(card.hp);
    const damage = this.getDamageValue(card.attacks);
    const weakCount = this.getWeakCount(card.weaknesses);

    const raw = ((hpNum / 10) + (damage / 10) + 10 - weakCount) / 5;
    const happiness = Math.floor(raw);
    return happiness < 0 ? 0 : happiness;
  }

  getHappinessPercent(card: any): number {
    const h = this.getHappiness(card);
    return Math.min(h * 10, 100);
  }

  getHappinessIcons(count: number) {
    return Array(count).fill(0);
  }


  constructor(private cardService: CardService) {}

  saveData() {
    // console.log("Saving Pokedex:", this.pokedex);
    this.cardService.savePokedex(this.pokedex).subscribe({
      next: (res) => {
        // alert("Saved!");
        console.log("Saved!");
      },
      error: (err) => {
        console.error(err);
        alert("Save failed");
      }
    });
  }

ngOnInit() {
  this.cardService.loadPokedex().subscribe({
    next: (data: any[]) => {
      // console.log("Data received from server:", data);
      this.pokedex = data;
      // console.log("Loaded Pokedex:", data);
    },
    error: (err: any) => {
      console.error("Load error", err);
    }
  });
}

getCardColor(p: any) {
  let mainType = null;
  console.log("Determining color for card:", p.type);
  // console.log("Card types:", p.type);
  if (Array.isArray(p.type)) {
    mainType = p.type[0];
  } else if (typeof p.type === 'string') {
    mainType = p.type;
  }

  if (!mainType) return '#eee';

  const c = this.COLORS[mainType] || '#eee';
  console.log(`Color for type ${mainType}: ${c}`);
  return `${c}`;
}




}