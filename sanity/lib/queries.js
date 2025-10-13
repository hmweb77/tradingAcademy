// GROQ queries for fetching data from Sanity

// Fetch all active free resources ordered by display order
export const freeResourcesQuery = `
  *[_type == "freeResource" && isActive == true] | order(order asc) {
    _id,
    title,
    description,
    pagesDisplay,
    icon,
    features,
    "imageUrl": image.asset->url,
    "pdfUrl": pdfFile.asset->url,
    order,
    titleFr,
    descriptionFr,
    pagesDisplayFr,
    featuresFr,
    titleAr,
    descriptionAr,
    pagesDisplayAr,
    featuresAr
  }
`

// Fetch live trading settings (should only be one document)
export const liveTradingSettingsQuery = `
  *[_type == "liveTradingSettings"][0] {
    _id,
    sessionDaysDisplay,
    timeDisplay,
    priceDisplay,
    isAcceptingApplications,
    sessionDaysDisplayFr,
    timeDisplayFr,
    priceDisplayFr,
    sessionDaysDisplayAr,
    timeDisplayAr,
    priceDisplayAr
  }
`

// Fetch group coaching settings (should only be one document)
export const groupCoachingSettingsQuery = `
  *[_type == "groupCoachingSettings"][0] {
    _id,
    programDurationDisplay,
    priceDisplay,
    paymentPlansText,
    nextCohortDisplay,
    spotsDisplay,
    isAcceptingEnrollment,
    programDurationDisplayFr,
    priceDisplayFr,
    paymentPlansTextFr,
    nextCohortDisplayFr,
    spotsDisplayFr,
    programDurationDisplayAr,
    priceDisplayAr,
    paymentPlansTextAr,
    nextCohortDisplayAr,
    spotsDisplayAr
  }
`

// Fetch a specific free resource by ID (for email sending)
export const freeResourceByIdQuery = `
  *[_type == "freeResource" && _id == $id][0] {
    _id,
    title,
    "pdfUrl": pdfFile.asset->url
  }
`