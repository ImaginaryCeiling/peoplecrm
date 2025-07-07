//use to parse vcard files into a json format

export interface VCardContact {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    role?: string;
    linkedin?: string;
    notes?: string;
    organization?: string;
  }
  
  export function parseVCard(vcardContent: string): VCardContact {
    const contact: VCardContact = {};
    
    const lines = vcardContent.split(/\r?\n/);
    
    for (const line of lines) {
      if (!line.trim() || line.startsWith('BEGIN:') || line.startsWith('END:')) {
        continue;
      }
      
  
      const cleanLine = line.replace(/^[ \t]/, '');
      
      if (cleanLine.startsWith('FN:')) {
  
        contact.name = cleanLine.substring(3).trim();
      } else if (cleanLine.startsWith('N:')) {
  
        const nameParts = cleanLine.substring(2).split(';');
        if (nameParts.length >= 2) {
          const lastName = nameParts[0] || '';
          const firstName = nameParts[1] || '';
          contact.name = `${firstName} ${lastName}`.trim();
        }
      } else if (cleanLine.startsWith('EMAIL')) {
  
        const emailMatch = cleanLine.match(/EMAIL[^:]*:(.+)/);
        if (emailMatch) {
          contact.email = emailMatch[1].trim();
        }
      } else if (cleanLine.startsWith('TEL')) {
  
        const phoneMatch = cleanLine.match(/TEL[^:]*:(.+)/);
        if (phoneMatch) {
          contact.phone = phoneMatch[1].trim();
        }
      } else if (cleanLine.startsWith('ADR')) {
  
        const adrMatch = cleanLine.match(/ADR[^:]*:(.+)/);
        if (adrMatch) {
          const addressParts = adrMatch[1].split(';');
  
          const city = addressParts[3] || '';
          const region = addressParts[4] || '';
          const country = addressParts[6] || '';
          const locationParts = [city, region, country].filter(Boolean);
          if (locationParts.length > 0) {
            contact.location = locationParts.join(', ');
          }
        }
      } else if (cleanLine.startsWith('TITLE:')) {
        contact.role = cleanLine.substring(6).trim();
      } else if (cleanLine.startsWith('ORG:')) {
        contact.organization = cleanLine.substring(4).trim();
      } else if (cleanLine.startsWith('URL:')) {
  
        const url = cleanLine.substring(4).trim();
        if (url.includes('linkedin.com')) {
          contact.linkedin = url;
        }
      } else if (cleanLine.startsWith('NOTE:')) {
  
        contact.notes = cleanLine.substring(5).trim();
      }
    }
    
  
    Object.keys(contact).forEach(key => {
      if (contact[key as keyof VCardContact] === '') {
        delete contact[key as keyof VCardContact];
      }
    });
    
    return contact;
  }
  
  export function parseMultipleVCards(vcardContent: string): VCardContact[] {
    const contacts: VCardContact[] = [];
    
  
    const vcardBlocks = vcardContent.split(/BEGIN:VCARD/);
    
    for (const block of vcardBlocks) {
      if (block.trim()) {
        const fullVCard = `BEGIN:VCARD${block}`;
        const contact = parseVCard(fullVCard);
        if (contact.name) { 
          contacts.push(contact);
        }
      }
    }
    
  
    if (contacts.length === 0 && vcardContent.includes('FN:') || vcardContent.includes('N:')) {
      const singleContact = parseVCard(vcardContent);
      if (singleContact.name) {
        contacts.push(singleContact);
      }
    }
    
    return contacts;
  } 