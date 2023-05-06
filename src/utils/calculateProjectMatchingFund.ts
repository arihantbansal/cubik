export interface Grant {
  funding: number[];
}

export function calculateProjectMatchingFund(
  maxDonation: number, // the maximum donation a user can make
  step: number, // number of precision steps for the graph
  projectContributions: number[],
  grants: Grant[],
  availableMatch: number
): { donation: number; additionalMatch: number }[] {
  const dataPoints = []; // the data points for the graph

  const isFirstContribution =
    projectContributions.length === 0 &&
    grants.every((grant) => grant.funding.length === 0);

  for (let donation = 0; donation <= maxDonation; donation += step) {
    if (isFirstContribution) {
      dataPoints.push({ donation, additionalMatch: availableMatch });
    } else {
      let summed = 0;

      let projectSumAmount = projectContributions.reduce(
        (sum, contribution) => sum + Math.sqrt(contribution),
        0
      );

      let projectSumAmountWithDonation = projectSumAmount + Math.sqrt(donation);

      let projectTotal = projectSumAmount * projectSumAmount;
      let projectTotalWithDonation =
        projectSumAmountWithDonation * projectSumAmountWithDonation;

      for (const grant of grants) {
        let grantSumAmount = grant.funding.reduce(
          (sum, contribution) => sum + Math.sqrt(contribution),
          0
        );

        let grantTotal = grantSumAmount * grantSumAmount;
        summed += grantTotal;
      }

      summed += projectTotal;

      let divisor =
        availableMatch / (summed - projectTotal + projectTotalWithDonation);

      let matchedAmount = projectTotal * divisor;
      let matchedAmountWithDonation = projectTotalWithDonation * divisor;

      let donationImpact = matchedAmountWithDonation - matchedAmount;

      dataPoints.push({ donation, additionalMatch: donationImpact });
    }
  }

  return dataPoints;
}
