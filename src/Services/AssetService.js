import { v4 as uuidv4 } from 'uuid';
import MonaLisaImg from '../Assets/MonaLisa.jpg';
import TheStarryNightImg from '../Assets/TheStarryNight.jpg';
import AmericanGothicImg from '../Assets/AmericanGothic.jpg';
import GlassGuitarAndBottleImg from '../Assets/GlassGuitarAndBottle.jpg';
import SelfPortraitWithBroadBrimmedHatImg from '../Assets/SelfPortraitWithBroadBrimmedHat.jpg';
import SelfPortraitWithStrawHatImg from '../Assets/SelfPortraitWithStrawHat.jpg';
import SolitudeImg from '../Assets/Solitude.jpg';
import StudyForASundayOnLaGrandeJatteImg from '../Assets/StudyForASundayOnLaGrandeJatte.jpg';
import TheHouseOnTheBridgeImg from '../Assets/TheHouseOnTheBridge.jpg';
import TheSpanishSingerImg from '../Assets/TheSpanishSinger.jpg';

class AssetService {


  generateT1Item(rarity) {
    return {
      assetId: uuidv4(),
      rarity: rarity,
      name: 'Mona Lisa'
    }
  }   
  
  generateT2Item(rarity) {
    return {
      assetId: uuidv4(),
      rarity: rarity,
      name: 'The Starry Night'
    }
  }   
  
  generateT3Item(rarity) {
    return {
      assetId: uuidv4(),
      rarity: rarity,
      name: 'Self-Portrait with a Straw Hat'
    }
  }   
  
  generateT4Item(rarity) {
    return {
      assetId: uuidv4(),
      rarity: rarity,
      name: 'American Gothic'
    }
  } 

  generateT5Item(rarity) {
    return {
      assetId: uuidv4(),
      rarity: rarity,
      name: 'The Spanish Singer'
    }
  } 

  generateT6Item(rarity) {
    return {
      assetId: uuidv4(),
      rarity: rarity,
      name: 'Study for A Sunday on La Grande Jatte'
    }
  } 

  generateT7Item(rarity) {
    return {
      assetId: uuidv4(),
      rarity: rarity,
      name: 'The House on the Bridge'
    }
  } 

  generateT8Item(rarity) {
    return {
      assetId: uuidv4(),
      rarity: rarity,
      name: 'Solitude'
    }
  } 

  generateT9Item(rarity) {
    return {
      assetId: uuidv4(),
      rarity: rarity,
      name: 'Self Portrait With Broad Brimmed Hat'
    }
  } 

  generateT10Item(rarity) {
    return {
      assetId: uuidv4(),
      rarity: rarity,
      name: 'Glass, Guitar, and Bottle'
    }
  } 

  // Generate random asset
  randomAsset() {
    // Generate rarity
    var rarity = Math.round(Math.random()*100);

    // Process rarity and get item by tier
    switch(true) {
      case(rarity > 0 && rarity <= 10):
        return this.generateT1Item(rarity);
      case(rarity > 10 && rarity <= 20):
        return this.generateT2Item(rarity);        
      case(rarity > 20 && rarity <= 30):
        return this.generateT3Item(rarity);
      case(rarity > 30 && rarity <= 40):
        return this.generateT4Item(rarity);
      case(rarity > 40 && rarity <= 50):
        return this.generateT5Item(rarity);
      case(rarity > 50 && rarity <= 60):
        return this.generateT6Item(rarity);
      case(rarity > 60 && rarity <= 70):
        return this.generateT7Item(rarity);
      case(rarity > 70 && rarity <= 80):
        return this.generateT8Item(rarity);
      case(rarity > 80 && rarity <= 90):
        return this.generateT9Item(rarity);
      case(rarity > 90 && rarity <= 100):
        return this.generateT10Item(rarity);
      default:
        break;
    }
  }

  // Pass asset name, get asset image
  getAssetImageResource = (assetName) => {
    switch(assetName){
      case 'Glass, Guitar, and Bottle':
        return GlassGuitarAndBottleImg;  
      case 'Mona Lisa':
        return MonaLisaImg;      
      case 'American Gothic':
        return AmericanGothicImg;
      case 'The Starry Night':
        return TheStarryNightImg;
      case 'Self Portrait With Broad Brimmed Hat':
        return SelfPortraitWithBroadBrimmedHatImg;
      case 'Solitude':
        return SolitudeImg;
      case 'The House on the Bridge':
        return TheHouseOnTheBridgeImg;
      case 'Study for A Sunday on La Grande Jatte':
        return StudyForASundayOnLaGrandeJatteImg;
      case 'The Spanish Singer':
        return TheSpanishSingerImg;      
      case 'Self-Portrait with a Straw Hat':
        return SelfPortraitWithStrawHatImg;
      default:
        return null
    }
  }


}

export default new AssetService();