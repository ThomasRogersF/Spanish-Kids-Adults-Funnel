export const paymentLinks = {
  group: {
    monthly: {
      withoutAcademy: "https://spanishvip.punchpass.com/catalogs/purchase/pass/99815?check=&catalog_pass_guest_checkout_form%5Bfirst_name%5D=&catalog_pass_guest_checkout_form%5Blast_name%5D=&catalog_pass_guest_checkout_form%5Bemail%5D=&catalog_pass_guest_checkout_form%5Bdiscount_code%5D=BLACKFVIP2025%23",
      withAcademy: "https://buy.stripe.com/bJe4gzgHrgWZ3tQfaw0VO1o"
    },
    quarterly: {
      withoutAcademy: "https://spanishvip.punchpass.com/catalogs/purchase/pass/102493?check=&catalog_pass_guest_checkout_form%5Bfirst_name%5D=&catalog_pass_guest_checkout_form%5Blast_name%5D=&catalog_pass_guest_checkout_form%5Bemail%5D=&catalog_pass_guest_checkout_form%5Bdiscount_code%5D=BLACKFVIP2025%23",
      withAcademy: "https://buy.stripe.com/aFaeVd4YJayB2pM3rO0VO1p"
    }
    ,
    "6_months": {
      withoutAcademy: "https://spanishvip.punchpass.com/catalogs/purchase/pass/106514?check=&catalog_pass_guest_checkout_form%5Bfirst_name%5D=&catalog_pass_guest_checkout_form%5Blast_name%5D=&catalog_pass_guest_checkout_form%5Bemail%5D=&catalog_pass_guest_checkout_form%5Bdiscount_code%5D=BLACKFVIP2025%23",
      withAcademy: "https://buy.stripe.com/4gMdR92QBayBfcye6s0VO1s"
    }
  },
  private: {
    monthly: {
      withoutAcademy: "https://buy.stripe.com/4gMfZhaj3bCFaWi0fC0VO0Z",
      withAcademy: "https://buy.stripe.com/00w7sL62NcGJc0m6E00VO1n"
    },
  },
  bundled: {
    monthly: {
      withoutAcademy: "https://buy.stripe.com/cNi3cv3UF3695BY0fC0VO1l",
      withAcademy: "https://buy.stripe.com/28E8wPgHrbCFc0md2o0VO1q"
    },
    quarterly: {
      withoutAcademy: "https://buy.stripe.com/9B6bJ18aV4ad5BY0fC0VO1m",
      withAcademy: "https://buy.stripe.com/fZu8wPcrbdKNggC7I40VO1r"
    }
  },
};

export type PlanType = 'group' | 'private' | 'bundled';
export type Term = 'monthly' | 'quarterly' | '6_months';

export const getPaymentLink = (planType: PlanType, includeAcademy: boolean, term: Term = 'monthly'): string => {
  const plan = paymentLinks[planType] as any;
  const termBucket = plan[term] ?? plan['monthly'];
  return termBucket[includeAcademy ? 'withAcademy' : 'withoutAcademy'];
};