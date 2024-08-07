// single priciple
interface ItemCategory {
  type: string;
}

class Electronics implements ItemCategory {
  type = 'Electronics';
}
class Groceries implements ItemCategory {
  type = 'Groceries';
}
class Clothing implements ItemCategory {
  type = 'Clothing';
}
class Mobiles implements ItemCategory {
  type = 'Mobiles';
}

class Books implements ItemCategory {
  type = 'Books';
}

class Taxcalulator {
  calculateTax(itemCategory: ItemCategory, itemPrice: number) {
    let taxRate = 0;
    switch (itemCategory.type) {
      case 'Electronics':
        taxRate = 0.1; // 10% tax rate for electronics
        break;
      case 'Groceries':
        taxRate = 0.05; // 5% tax rate for groceries
        break;
      case 'Clothing':
        taxRate = 0.08; // 8% tax rate for clothing
        break;
      case 'Mobiles':
        taxRate = 0.12; // 12% tax rate for mobiles
        break;
      default:
        taxRate = 0; // No tax for unknown categories
        break;
    }
    return itemPrice * taxRate;
  }
}

// open & close
class BookTaxCalculator extends Taxcalulator {
 override calculateTax(itemCategory: ItemCategory, itemPrice: number): number {
    if (itemCategory.type === 'Books') {
      return itemPrice * 0.03;
    }
    return super.calculateTax(itemCategory, itemPrice);
  }
}

// liskov substituoin
const itemCategory: ItemCategory = new Books();
const taxCalculator: Taxcalulator = new BookTaxCalculator();
console.log(taxCalculator.calculateTax(itemCategory, 1000));

//  Interface Segregation
interface ElectronicsItem {
  type: 'Electronics';
}
interface GroceriesItem {
  type: 'Groceries';
}
interface ClothingItem {
  type: 'Clothing';
}
interface MobilesItem {
  type: 'Mobiles';
}

// Dependency inversion priciple
// const item: ElectronicsItem = { type: 'Electronics' };
const item: MobilesItem = { type: 'Mobiles' };
const elecTaxCal: Taxcalulator = new Taxcalulator();
console.log(elecTaxCal.calculateTax(item, 1000));
