import { STEP_THREE_FORM_LABELS } from '../../const/constLag';
import { OnboardingUI } from '../ui/pages/onboarding';
import { SkillForm } from '../ui/skillForm/SkillForm';
import userInfo from '../app/assets/static/images/userInfo.svg';
import { ThreeRegistrationSteps } from '../ui/threeRegistrationSteps/threeRegistrationSteps';
import styles from './thirdStepRegistrationForm.module.css';


export const ThirdStepRegistrationForm = () => {
  return (
    <div className={styles.page_register_third}>
      <ThreeRegistrationSteps />
      <div className={styles.two_block}>
        <SkillForm languageConst={STEP_THREE_FORM_LABELS} />
        <OnboardingUI
          title={'Расскажите немного о себе'}
          description={
            'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена'
          }
          imageSrc={userInfo}
          classContainer={styles.info}
        />
      </div>
    </div>
  );
};
