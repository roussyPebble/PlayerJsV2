import React from 'react';
import './icon.scss';
import '../../static/svg/player-play.svg';
import '../../static/svg/player-pause.svg';
import '../../static/svg/player-fullscreen.svg';
import '../../static/svg/player-fullscreen-enter.svg';
import '../../static/svg/player-fullscreen-exit.svg';
import '../../static/svg/player-reduce.svg';
import '../../static/svg/player-sound-hi.svg';
import '../../static/svg/player-sound-low.svg';
import '../../static/svg/player-sound-mute.svg';
import '../../static/svg/player-subtitles-off.svg';
import '../../static/svg/player-subtitles-on.svg';
import '../../static/svg/player-video-description.svg';
import '../../static/svg/player-info.svg';
import '../../static/svg/player-fermer.svg';

const Icon = (props) => (
    <svg className={props.className ? `${props.className}` : ''}>
        <use href={`#${props.name}`} />
    </svg>
);

export default Icon;