import { FaRegBell } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa';
import { FaRegCompass } from 'react-icons/fa';
import { FaRegFlag } from 'react-icons/fa';
import { FaRegFolder } from 'react-icons/fa';
import { FaRegFutbol } from 'react-icons/fa';
import { FaRegGem } from 'react-icons/fa';
import { FaRegGrinStars } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegKeyboard } from 'react-icons/fa';
import { FaRegLifeRing } from 'react-icons/fa';
import { FaRegLightbulb } from 'react-icons/fa';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FaRegPaperPlane } from 'react-icons/fa';
import { FaRegSnowflake } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { FaSpider } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa';

const icons = {
  FaRegBell,
  FaRegClock,
  FaRegCompass,
  FaRegFlag,
  FaRegFolder,
  FaRegFutbol,
  FaRegGem,
  FaRegGrinStars,
  FaRegHeart,
  FaRegKeyboard,
  FaRegLifeRing,
  FaRegLightbulb,
  FaRegMoneyBillAlt,
  FaRegPaperPlane,
  FaRegSnowflake,
  FaRegStar,
  FaSpider,
  FaUserGraduate,
};

const Icon = ({ color, icon, size = '50%' }) => {
  const IconTag = icons[icon || 'FaRegCompass'];
  return <IconTag color={color} size={size} />;
};

export default Icon;
