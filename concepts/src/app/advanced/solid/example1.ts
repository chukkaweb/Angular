// Requirement : product discount based on membership

interface Membership {
  type: string
}
export class RegularMembership implements Membership {
  type = 'Regular';
}

export class PremiumMembership implements Membership {
  type = 'Premium';
}

export class NewMembership implements Membership {
  type = 'New';
}

export class GoldMembership implements Membership {
  type: 'Gold' = 'Gold';
}

// SRP
class DiscountCalculator {
  calculateDiscount(member: Membership, purchaseAmount: number): number {
    switch (member.type) {
      case 'Regular': return purchaseAmount * 0.05;
      case 'Premium': return purchaseAmount * 0.1;
      case 'New': return purchaseAmount * 0.03;
      default: return 0;
    }
  }
}

// O/P
class GoldMembershipDiscountCalculator extends DiscountCalculator {
  override calculateDiscount(member: Membership, purchaseAmount: number): number {
    if (member.type === 'Gold') return purchaseAmount * 0.15;
    return super.calculateDiscount(member, purchaseAmount);
  }
}


// LSP
// Subclasses should be substitutable for their base classes.
const member: Membership = new GoldMembership();
let discountCalculator: DiscountCalculator = new GoldMembershipDiscountCalculator();
const discountAmount = discountCalculator.calculateDiscount(member, 3000);
console.log(discountAmount);


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

console.log('Regular Member Discount:',
  discountCalc.calculateDiscount(regularMember, 100)
);
console.log('Premium Member Discount:',
  discountCalc.calculateDiscount(premiumMember, 200)
);
console.log('New Member Discount:',
  discountCalc.calculateDiscount(newMember, 150)
);
console.log('Gold Member Discount:',
  discountCalc.calculateDiscount(goldMember, 300)
);

