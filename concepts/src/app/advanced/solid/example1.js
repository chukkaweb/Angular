"use strict";
// Requirement : product discount based on membership
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoldMembership = exports.NewMembership = exports.PremiumMembership = exports.RegularMembership = void 0;
var RegularMembership = /** @class */ (function () {
    function RegularMembership() {
        this.type = 'Regular';
    }
    return RegularMembership;
}());
exports.RegularMembership = RegularMembership;
var PremiumMembership = /** @class */ (function () {
    function PremiumMembership() {
        this.type = 'Premium';
    }
    return PremiumMembership;
}());
exports.PremiumMembership = PremiumMembership;
var NewMembership = /** @class */ (function () {
    function NewMembership() {
        this.type = 'New';
    }
    return NewMembership;
}());
exports.NewMembership = NewMembership;
var GoldMembership = /** @class */ (function () {
    function GoldMembership() {
        this.type = 'Gold';
    }
    return GoldMembership;
}());
exports.GoldMembership = GoldMembership;
// SRP
var DiscountCalculator = /** @class */ (function () {
    function DiscountCalculator() {
    }
    DiscountCalculator.prototype.calculateDiscount = function (member, purchaseAmount) {
        switch (member.type) {
            case 'Regular': return purchaseAmount * 0.05;
            case 'Premium': return purchaseAmount * 0.1;
            case 'New': return purchaseAmount * 0.03;
            default: return 0;
        }
    };
    return DiscountCalculator;
}());
// O/P
var GoldMembershipDiscountCalculator = /** @class */ (function (_super) {
    __extends(GoldMembershipDiscountCalculator, _super);
    function GoldMembershipDiscountCalculator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoldMembershipDiscountCalculator.prototype.calculateDiscount = function (member, purchaseAmount) {
        if (member.type === 'Gold')
            return purchaseAmount * 0.15;
        return _super.prototype.calculateDiscount.call(this, member, purchaseAmount);
    };
    return GoldMembershipDiscountCalculator;
}(DiscountCalculator));
// LSP
// Subclasses should be substitutable for their base classes.
var member = new GoldMembership();
var discountCalculator = new GoldMembershipDiscountCalculator();
var discountAmount = discountCalculator.calculateDiscount(member, 3000);
console.log(discountAmount);
