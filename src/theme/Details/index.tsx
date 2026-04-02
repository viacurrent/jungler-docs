import React, {type ReactNode} from 'react';
import {Details as DetailsGeneric} from '@docusaurus/theme-common/Details';
import type {Props} from '@theme/Details';

export default function Details({...props}: Props): ReactNode {
    return <DetailsGeneric {...props} />;
}
