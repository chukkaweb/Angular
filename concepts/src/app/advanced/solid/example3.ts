// SRP
// TaxCalculator class responsible for calculating tax
class TaxCalculator {
    calculateTax(itemCategory: string, itemPrice: number): number {
      let taxRate = 0;
  
      switch (itemCategory) {
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
  
// OCP

// Extension using inheritance for new item categories
class BooksTaxCalculator extends TaxCalculator {
    calculateTax(itemCategory: string, itemPrice: number): number {
      if (itemCategory === 'Books') {
        return itemPrice * 0.03; // 3% tax rate for books
      }
      // Delegate to parent class for other categories
      return super.calculateTax(itemCategory, itemPrice);
    }
  }
  
//   LSP
// LSP adherent class usage
// Objective: Subclasses should be substitutable for their base classes.
const taxCalculator: TaxCalculator = new BooksTaxCalculator();
const taxAmount = taxCalculator.calculateTax('Books', 50);
console.log('Tax for Books:', taxAmount);

// ISP
// Specific interfaces for item categories
interface ElectronicsItem {
    category: 'Electronics';
  }
  
  interface GroceriesItem {
    category: 'Groceries';
  }
  
  interface ClothingItem {
    category: 'Clothing';
  }
  
  interface MobilesItem {
    category: 'Mobiles';
  }
  

// DIP
// Dependency injection example
const item: ElectronicsItem = { category: 'Electronics' };
const taxCalculator: TaxCalculator = new TaxCalculator();
const taxAmount = taxCalculator.calculateTax(item.category, 100);
console.log(`Tax for ${item.category}:`, taxAmount);
