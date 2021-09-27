import { v4 as uuidv4 } from 'uuid';

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
      name: 'Van Gogh'
    }
  }   
  
  generateT3Item(rarity) {
    return {
      assetId: uuidv4(),
      rarity: rarity,
      name: 'Huge cheeseburger'
    }
  }   
  
  generateT4Item(rarity) {
    return {
      assetId: uuidv4(),
      rarity: rarity,
      name: 'Pizza'
    }
  } 

  randomAsset() {
    // Generate rarity
    var rarity = Math.round(Math.random()*10000);

    // Process rarity and get item by tier
    switch(true) {
      case(rarity > 0 && rarity <= 1000):
        return this.generateT1Item(rarity);
      case(rarity > 1000 && rarity <= 2000):
        return this.generateT2Item(rarity);        
      case(rarity > 2000 && rarity <= 3000):
        return this.generateT3Item(rarity);
      case(rarity > 3000 && rarity < 10000):
        return this.generateT4Item(rarity);
      default:
        break;
    }
  }


}

export default new AssetService();