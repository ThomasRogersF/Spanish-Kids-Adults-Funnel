export const paymentLinks = {
  group: {
    monthly: {
      withoutAcademy: "https://spanishvip.punchpass.com/passes/99815?pass%5Bcheck%5D=&pass%5Bpasstype_id%5D=99815&pass%5Bassignee_sgid%5D=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaVZuYVdRNkx5OXdkVzVqYUhCaGMzTXZRM1Z6ZEc5dFpYSXZNalV5TlRZM05nWTZCa1ZVIiwiZXhwIjoiMjAyNS0xMS0zMFQyMToyNjo1OC41NThaIiwicHVyIjoiZGVmYXVsdCJ9fQ%3D%3D--5a2e956c0f5ad7bf29fa7a26a4b0b9029e96c16d&pass%5Bdiscount_code%5D=FALL2025%23",
      withAcademy: "https://buy.stripe.com/bJe4gzgHrgWZ3tQfaw0VO1o"
    },
    quarterly: {
      withoutAcademy: "https://spanishvip.punchpass.com/passes/102493?pass%5Bcheck%5D=&pass%5Bpasstype_id%5D=102493&pass%5Bassignee_sgid%5D=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaVZuYVdRNkx5OXdkVzVqYUhCaGMzTXZRM1Z6ZEc5dFpYSXZNalV5TlRZM05nWTZCa1ZVIiwiZXhwIjoiMjAyNS0xMS0zMFQyMTozMDo0OS4yNzRaIiwicHVyIjoiZGVmYXVsdCJ9fQ%3D%3D--fcc08a08ef545a9f6c2ec949cee611e0d298a00c&pass%5Bdiscount_code%5D=FALL2025%23",
      withAcademy: "https://buy.stripe.com/aFaeVd4YJayB2pM3rO0VO1p"
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
export type Term = 'monthly' | 'quarterly';

export const getPaymentLink = (planType: PlanType, includeAcademy: boolean, term: Term = 'monthly'): string => {
  const plan = paymentLinks[planType] as any;
  const termBucket = plan[term] ?? plan['monthly'];
  return termBucket[includeAcademy ? 'withAcademy' : 'withoutAcademy'];
};