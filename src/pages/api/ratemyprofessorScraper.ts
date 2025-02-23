import { NextApiRequest, NextApiResponse } from 'next';

export type RateMyProfessorData = {
  legacyId: string;
  averageRating: number;
  numRatings: number;
  wouldTakeAgainPercentage: number;
  averageDifficulty: number;
  department: string;
  firstName: string;
  lastName: string;
};

type Data = {
  message: string;
  data?: RateMyProfessorData;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (
    !(
      'profFirst' in req.query &&
      typeof req.query.profFirst === 'string' &&
      'profLast' in req.query &&
      typeof req.query.profLast === 'string'
    )
  ) {
    res.status(400).json({ message: 'Incorrect query present' });
    return;
  }
  const url = new URL(
    'https://www.ratemyprofessors.com/search/professors/1273?',
  ); //UTD
  url.searchParams.append(
    'q',
    ((req.query.profFirst as string).split(' ')[0] +
      ' ' +
      req.query.profLast) as string,
  );
  return new Promise<void>((resolve) => {
    fetch(url.href, {
      method: 'GET',
    })
      .then((response) => response.text())
      .then((text) => {
        const regex =
          /"legacyId":(\w+),"avgRating":([\d.]+),"numRatings":(\d+),"wouldTakeAgainPercent":([\d.]+),"avgDifficulty":([\d.]+),"department":"([\w\s]+)","school":.+?,"firstName":"([\w-]+)","lastName":"([\w-]+)"/;
        const regexArray = text.match(regex);
        if (regexArray != null) {
          res.status(200).json({
            message: 'success',
            data: {
              legacyId: regexArray[1],
              averageRating: Number(regexArray[2]),
              numRatings: Number(regexArray[3]),
              wouldTakeAgainPercentage: Number(regexArray[4]),
              averageDifficulty: Number(regexArray[5]),
              department: regexArray[6],
              firstName: regexArray[7],
              lastName: regexArray[8],
            },
          });
          resolve();
        } else {
          res.status(200).json({
            message: 'not found',
          });
          resolve();
        }
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
        resolve();
      });
  });
}
