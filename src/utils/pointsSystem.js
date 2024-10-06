import { updateUserPoints } from '../firebase';

export const POINT_VALUES = {
  COMPLETE_STUDY_SESSION: 50,
  HELP_PEERS: 20,
  COMPLETE_QUIZ: 100,
};

export const awardPoints = async (userId, action) => {
  let points = 0;

  switch (action) {
    case 'COMPLETE_STUDY_SESSION':
      points = POINT_VALUES.COMPLETE_STUDY_SESSION;
      break;
    case 'HELP_PEERS':
      points = POINT_VALUES.HELP_PEERS;
      break;
    case 'COMPLETE_QUIZ':
      points = POINT_VALUES.COMPLETE_QUIZ;
      break;
    default:
      console.error('Invalid action for point award');
      return;
  }

  await updateUserPoints(userId, points);
};
