export interface Grant {
  id: string;
  contributions: number[];
}

export function calculateProjectMatchingFund(
  projectId: string, // The project that the user is donating to
  maxDonation: number, // The maximum donation that the user can make
  step: number, // The step size for the donation
  grant: Grant[], // The projects that are in the round that the user is donating to
  availableMatch: number
): { donation: number; additionalMatch: number }[] {
  const dataPoints = [];

  for (let donation = 0; donation <= maxDonation; donation += step) {
    let summed = 0;
    const arrOfMatch: { projectId: string; sum: number }[] = [];

    // Add the additional donation to the target project's contributions
    const updatedProjects = grant.map((project) => ({
      ...project,
      contributions:
        project.id === projectId
          ? [...project.contributions, donation]
          : project.contributions,
    }));

    updatedProjects.forEach((project) => {
      const sumOfRoots = project.contributions.reduce(
        (sum, contribution) => sum + Math.sqrt(contribution),
        0
      );
      const sumAmount = sumOfRoots * sumOfRoots;
      summed += sumAmount;
      arrOfMatch.push({
        projectId: project.id,
        sum: sumAmount,
      });
    });

    const divisor = availableMatch / summed;

    const finalMatch = updatedProjects.map((project) => ({
      projectId: project.id,
      amount:
        arrOfMatch.find((match) => match.projectId === project.id)?.sum *
        divisor,
    }));

    const donationImpact =
      finalMatch.find((match) => match.projectId === projectId)?.amount || 0;

    dataPoints.push({ donation, additionalMatch: donationImpact });
  }

  return dataPoints;
}
