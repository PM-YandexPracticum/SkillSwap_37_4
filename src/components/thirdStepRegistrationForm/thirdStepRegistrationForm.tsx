import { STEP_THREE_FORM_LABELS } from '../../const/constLag';
import { InfoBlock } from '../ui/infoRegisterBlock/InfoRegisterBlock';
import { SkillForm } from '../ui/skillForm/SkillForm';
import { ThreeRegistrationSteps } from '../ui/threeRegistrationSteps/threeRegistrationSteps';
import styles from './thirdStepRegistrationForm.module.css';

/**
 * советую вывести блок с классом info в отдельный компонент.
 */
export const ThirdStepRegistrationForm = () => {
  return (
    <div className={styles.page_register_third}>
      <ThreeRegistrationSteps />
      <div className={styles.two_block}>
        <SkillForm languageConst={STEP_THREE_FORM_LABELS} />
        <InfoBlock
          title={'Расскажите немного о себе'}
          text={
            'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена'
          }
          imageUrl={'src/components/app/assets/static/register/user info.svg'}
        />
      </div>
    </div>
  );
};
