// single priciple
interface Membership {
  type: string;
}
export class RegularMembership implements Membership {
  type: 'Regular' = 'Regular'; // in always not required its came because of interface principle.
}
export class PremiumMembership implements Membership {
  type: 'Premium' = 'Premium';
}
export class NewMembership implements Membership {
  type: 'New' = 'New';
}

class DiscountCalculator {
  calculateDiscount(member: Membership, purchaseAmount: number) {
    switch (member.type) {
      case 'Regular':
        return purchaseAmount * 0.05;
      case 'Premium':
        return purchaseAmount * 0.1;
      case 'New':
        return purchaseAmount * 0.03;
      default:
        return 0;
    }
  }
}

export class GoldMembership implements Membership {
  type: 'Gold' = 'Gold';
}

// open & close priciple
class GoldMembershipDiscountCalculator extends DiscountCalculator {
  override calculateDiscount(member: Membership, purchaseAmount: number): number {
    if (member.type === 'Gold') {
      return purchaseAmount * 0.15; // 15% discount for gold members
    }
    // Delegate to parent class for other membership types
    return super.calculateDiscount(member, purchaseAmount); // super used for accessing the parent class method
  }
}
// super keyword refers to the parent class (DiscountCalculator), allowing access to its methods and properties from the subclass (GoldMembershipDiscountCalculator).

// Liskov Substitution Principle (
// Subclasses should be substitutable for their base classes.
// here GoldMembership and GoldMembershipDiscountCalculator subclasse and Membership , DiscountCalculator are base classes
const member: Membership = new GoldMembership();
let discountCalculator: DiscountCalculator =
  new GoldMembershipDiscountCalculator();
const discountAmount = discountCalculator.calculateDiscount(member, 2000);
// console.log('Discount for Gold member:', discountAmount);

// Interface Segregation Principle
// Clients should not be forced to depend on interfaces they do not use.
interface RegularMember extends Membership {
  type: 'Regular';
}

interface PremiumMember extends Membership {
  type: 'Premium';
}

interface NewMember extends Membership {
  type: 'New';
}

interface GoldMember extends Membership {
  type: 'Gold';
}

// Dependency Inversion Principle
// Depend on abstractions, not on concretions
const regularMember: RegularMember = new RegularMembership();
const premiumMember: PremiumMember = new PremiumMembership();
const newMember: NewMember = new NewMembership();
const goldMember: GoldMember = new GoldMembership();

const discountCalc: DiscountCalculator = new DiscountCalculator();
// console.log(
//   'Regular Member Discount:',
//   discountCalc.calculateDiscount(regularMember, 100)
// );
// console.log(
//   'Premium Member Discount:',
//   discountCalc.calculateDiscount(premiumMember, 200)
// );
// console.log(
//   'New Member Discount:',
//   discountCalc.calculateDiscount(newMember, 150)
// );
// console.log(
//   'Gold Member Discount:',
//   discountCalc.calculateDiscount(goldMember, 300)
// );

// SRP: Membership classes handle membership details, while DiscountCalculator focuses solely on discount calculation.

// OCP: We extend the DiscountCalculator with GoldMembershipDiscountCalculator for additional membership types without modifying existing code.

// LSP: GoldMembership and GoldMembershipDiscountCalculator can replace their base classes (Membership and DiscountCalculator) without affecting functionality.

// ISP: Specific interfaces (RegularMember, PremiumMember, NewMember, GoldMember) are used to avoid forcing clients to depend on unnecessary details.

// DIP: Dependency injection is demonstrated by injecting different membership instances into the DiscountCalculator, promoting loose coupling and flexibility.
