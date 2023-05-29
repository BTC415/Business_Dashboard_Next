import React from 'react'
import {
  mdiChevronUp,
  mdiChevronDown,
  mdiAlertCircleOutline,
  mdiInformationOutline,
  mdiCheckCircle,
  mdiAlertOutline,
  mdiTimerSand,
  mdiCloseCircle,
  mdiTelevisionClassic,
  mdiMonitorDashboard,
} from '@mdi/js'
import { ColorKey, TrendType } from '../interfaces'
import PillTag from './PillTag'

type Props = {
  label: string
  type: TrendType
  color: ColorKey
  small?: boolean
}

const PillTagTrend = ({ small = false, ...props }: Props) => {
  const trendIcon = {
    up: mdiChevronUp,
    down: mdiChevronDown,
    success: mdiCheckCircle,
    danger: mdiAlertOutline,
    warning: mdiAlertCircleOutline,
    info: mdiInformationOutline,
    failed: mdiCloseCircle,
    waiting:mdiTimerSand,
    dashboard:mdiMonitorDashboard,
  }[props.type]

  return <PillTag label={props.label} color={props.color} icon={trendIcon} small={small} />
}

export default PillTagTrend
