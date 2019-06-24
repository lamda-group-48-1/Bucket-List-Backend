import express from 'express';
import auth from './auth';

const router = express.Router();
router.use('/api/v1/auth', auth);


router.get('/', (req, res) => {
  res.status(200).send(`<h1>Welcome Bucket List Application</h1>
    <p>BUCKET LIST is a web app that helps user to keep track of their dreams, aspirations and long life desires.</p>
    <h4>Please use PostMan and navigate to <code>/api/v1</code> to use the app</h4>
    <h4>Thanks  &#x1F600;</h4>`);
});

router.all('*', (req, res) => res.status(404).send({
  status: 'error',
  message: 'you have entered an incorrect route',
}));
export default router;
