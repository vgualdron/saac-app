const getConfigurationParam = (reference) => {
  const configurations = localStorage.getItem('common')
    ? JSON.parse(localStorage.getItem('common')).configurations
    : []
  const configuration = configurations.find((config) => config.reference === reference)
  return configuration ? configuration : null
}

export { getConfigurationParam }
