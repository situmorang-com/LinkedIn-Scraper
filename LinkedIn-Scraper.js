// JavaScript for Automation (JXA) to interact with the browser and scrape data from LinkedIn

function run() {
    const browsers = ["Google Chrome", "Arc", "Safari"];  // List of browsers to check

    // Loop through each browser to find the active window
    for (const browserName of browsers) {
        try {
            const browser = Application(browserName);
            if (!browser.running()) continue;  // Skip if the browser is not running

            const windows = browser.windows();
            const activeTab = windows[0].activeTab();  // Get the URL of the active tab

            const url = activeTab.url();  // Get the URL of the active tab

            if (url.includes("linkedin.com/in/")) {
                // Run JavaScript directly in the browser to scrape data
                const script = `
                    (function() {
                        const getTextContent = (selector) => {
                            const element = document.querySelector(selector);
                            return element ? element.textContent.trim() : 'Not found';
                        };

                        const name = getTextContent('.text-heading-xlarge');
                        const title = getTextContent('.text-body-medium');

                        // Confirm the "Experience" section using an h2 > span that includes "Experience"
                        const experienceSectionHeader = Array.from(document.querySelectorAll('h2 > span')).find(
                            span => span.innerText.includes('Experience')
                        );
                        let company = 'Not found';
                        let jobTitle = 'Not found';

                        if (experienceSectionHeader) {
                            // Find the "Experience" section by traversing up to the closest section
                            const experienceSection = experienceSectionHeader.closest('section');

                            if (experienceSection) {
                                // Primary Route: Find the first <a> with data-field="experience_company_logo" that has a descendant <span aria-hidden="true">
                                const companyAnchor = Array.from(experienceSection.querySelectorAll('a[data-field="experience_company_logo"]')).find(
                                    a => a.querySelector('span[aria-hidden="true"]')
                                );

                                if (companyAnchor) {
                                    // Extract the company name from the <span> inside the <a> element
                                    const companyNameElement = companyAnchor.querySelector('span[aria-hidden="true"]');
                                    if (companyNameElement) {
                                        company = companyNameElement.textContent.trim();
                                    }

                                    // Find the sibling div of the parent of <a> for the job title
                                    const companyParentDiv = companyAnchor.closest('div');

                                    // Navigate to the sibling div of the parent div
                                    const siblingDiv = companyParentDiv?.nextElementSibling;
                                    if (siblingDiv) {
                                        // Find the span with aria-hidden="true" within this sibling div for the job title
                                        const jobTitleElement = siblingDiv.querySelector('span[aria-hidden="true"]');
                                        if (jobTitleElement) {
                                            jobTitle = jobTitleElement.textContent.trim();
                                        }
                                    }
                                }

                                // Fallback Route if Primary Route does not provide valid company name or job title
                                if (company === 'Not found' || company === jobTitle) {
                                    // Find the "Present" element within the "Experience" section
                                    const presentElement = Array.from(experienceSection.querySelectorAll('span')).find(
                                        span => span.textContent.includes('Present')
                                    );

                                    if (presentElement) {
                                        // Company Name: <span aria-hidden="true"> as descendant of presentElement.previousElementSibling after removing " · Full-time"
                                        const companyNameElementAlt = presentElement.previousElementSibling?.querySelector('span[aria-hidden="true"]');
                                        if (companyNameElementAlt) {
                                            company = companyNameElementAlt.textContent.replace(' · Full-time', '').trim();
                                        }

                                        // Job Title: <span aria-hidden="true"> as descendant of presentElement.previousElementSibling.previousElementSibling
                                        const jobTitleElementAlt = presentElement.previousElementSibling?.previousElementSibling?.querySelector('span[aria-hidden="true"]');
                                        if (jobTitleElementAlt) {
                                            jobTitle = jobTitleElementAlt.textContent.trim();
                                        }
                                    }
                                }
                            }
                        }

                        return {
                            name,
                            title,
                            company,
                            jobTitle,
                            profileUrl: window.location.href
                        };
                    })();
                `;

                const profileData = activeTab.execute({ javascript: script });

                if (profileData) {
                    const output = `Name: ${profileData.name}\nTitle: ${profileData.title}\nCompany: ${profileData.company}\nJob Title: ${profileData.jobTitle}\nProfile URL: ${profileData.profileUrl}`;
                    return output;
                } else {
                    return "Failed to scrape data.";
                }
            }
        } catch (error) {
            // Ignore errors for browsers that are not running or not supported
        }
    }

    return "No LinkedIn profile found in the topmost browser window.";
}

run();
