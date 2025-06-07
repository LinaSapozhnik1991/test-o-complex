export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  let formatted = '+7 ('
  
  if (cleaned.length > 1) {
    const part1 = cleaned.slice(1, 4)
    formatted += part1
    if (part1.length === 3) formatted += ') '
  }
  
  if (cleaned.length > 4) {
    const part2 = cleaned.slice(4, 7)
    formatted += part2
    if (part2.length === 3) formatted += '-'
  }
  
  if (cleaned.length > 7) {
    const part3 = cleaned.slice(7, 9)
    formatted += part3
    if (part3.length === 2) formatted += '-'
  }
  
  if (cleaned.length > 9) {
    const part4 = cleaned.slice(9, 11)
    formatted += part4
  }
  
  return formatted
}

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
  return phoneRegex.test(phone)
}