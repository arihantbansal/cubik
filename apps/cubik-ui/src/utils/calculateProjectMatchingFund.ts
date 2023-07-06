// Define the structure of a Grant
export interface Grant {
  id: string;
  contributions: number[];
}

// Function to calculate the amount of matching funds a project would receive for various donation amounts
export function calculateProjectMatchingFund(
  projectId: string, // ID of the project to donate to
  maxDonation: number, // Maximum donation amount to consider
  step: number, // Step size for iterating over donation amounts
  grant: Grant[], // Array of all projects in the funding round
  availableMatch: number // Total amount of matching funds available
): { donation: number; additionalMatch: number }[] {
  const dataPoints = []; // Initialize array to store results

  // Iterate over donation amounts from 0 to maxDonation, in steps of size step
  for (let donation = 0; donation <= maxDonation; donation += step) {
    let summed = 0; // Initialize variable to store sum of square roots of contributions for all projects
    const arrOfMatch: { projectId: string; sum: number }[] = []; // Initialize array to store sum of square roots of contributions for each project

    // Add the current donation amount to the contributions of the project being donated to
    const updatedProjects = grant.map((project) => ({
      ...project,
      contributions:
        project.id === projectId
          ? [...project.contributions, donation]
          : project.contributions,
    }));

    // Iterate over all projects and calculate the sum of square roots of contributions for each one
    updatedProjects.forEach((project) => {
      const sumOfRoots = project.contributions?.reduce(
        (sum, contribution) => sum + Math.sqrt(contribution),
        0
      );
      const sumAmount = sumOfRoots * sumOfRoots;
      summed += sumAmount; // Add the square of sum of roots to the total sum
      arrOfMatch.push({ projectId: project.id, sum: sumAmount }); // Store the square of sum of roots for each project
    });

    // Calculate the ratio of available matching funds to the total sum, to get the amount of matching funds per unit sum
    const divisor = availableMatch / summed;

    // Calculate the amount of matching funds each project would receive
    const finalMatch = updatedProjects.map((project) => ({
      projectId: project.id,
      amount:
        arrOfMatch.find((match) => match.projectId === project.id)?.sum! *
        divisor,
    }));

    // Find the amount of additional matching funds the project would receive if the current donation amount were donated
    const donationImpact =
      finalMatch.find((match) => match.projectId === projectId)?.amount || 0;

    // Add an object to the results array that includes the current donation amount and the calculated additional matching funds
    dataPoints.push({ donation, additionalMatch: donationImpact });
  }

  // Return the results array
  return dataPoints;
}
