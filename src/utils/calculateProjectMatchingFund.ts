export interface Grant {
  funding: number[];
  projectId: string;
}

export function calculateProjectMatchingFund(
  projectId: string,
  maxDonation: number,
  step: number,
  projectContributions: { projectId: string; amount: number }[],
  grants: Grant[],
  availableMatch: number
): { donation: number; additionalMatch: number }[] {
  const dataPoints = [];

  for (let donation = 0; donation <= maxDonation; donation += step) {
    let summed = 0;
    const arrOfMatch: { projectId: string; sum: number }[] = [];

    const projectMapContribution = [
      ...projectContributions,
      { projectId, amount: donation },
    ];

    grants.forEach((grant) => {
      let sumAmount = 0;
      projectMapContribution
        .filter((project) => project.projectId === grant.projectId)
        .forEach((project) => {
          sumAmount += Math.sqrt(project.amount);
        });

      sumAmount *= sumAmount;
      summed += sumAmount;
      arrOfMatch.push({
        projectId: grant.projectId,
        sum: sumAmount,
      });
    });

    let divisor = availableMatch / summed;

    const finalMatch = grants.map((grant) => {
      return {
        projectId: grant.projectId,
        amount:
          arrOfMatch.filter((e) => e.projectId === grant.projectId)[0].sum *
          divisor,
      };
    });

    const donationImpact =
      finalMatch.filter((e) => e.projectId === projectId)[0]?.amount || 0;

    dataPoints.push({ donation, additionalMatch: donationImpact });
  }

  return dataPoints;
}
