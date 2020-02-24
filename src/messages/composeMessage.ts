import reservation from './reservation'
import reminder from './reminder'
import confirmation from './confirmation'
import { IReservationModel } from '../map/model/reservation'

export function generateTitle(
  type: 'reservation' | 'reminder' | 'confirmation',
  language: 'fi' | 'sv' | 'en'
) {
  return {
    reservation: {
      fi: 'Tervetuloa mukaan SATAKOLKYT-talkoisiin!',
      sv: 'Välkommen med på HUNDRATRETTI-talko!',
      en: 'Welcome to the SATAKOLKYT cleanup-campaign!'
    },
    reminder: {
      fi: 'SATAKOLKYT-talkoot tulossa',
      sv: 'Kommande HUNDRATRETTI-talko',
      en: 'SATAKOLKYT cleanup will be soon!'
    },
    confirmation: {
      fi: 'Kiitos, kun osallistuitte SATAKOLKYT-talkoisiin!',
      sv: 'Tack för att ni deltog i HUNDRATRETTI-talko!',
      en: 'Thank you for participating in the SATAKOLKYT cleanup campaign!'
    }
  }[type][language]
}

export function composeMessage(
  type: 'reservation' | 'reminder' | 'confirmation',
  language: 'fi' | 'sv' | 'en',
  reserv?: IReservationModel
) {
  const messages = {
    reservation,
    reminder,
    confirmation
  }
  return messages[type](language, reserv)
}
