import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addZero } from '../../lib/utils';
import { deleteUserEvent, updateUserEvent, UserEvent } from '../../redux/user-events';

interface Props {
    event: UserEvent;
}

/**
 * The EventItem component is a UI card that represents individual user events for the Calendar component 
 * @param param0 
 */
const EventItem: React.FC<Props> = ({ event }) => {
    const startTime = new Date(event.dateStart);
    const endTime = new Date(event.dateEnd);
    const dispatch = useDispatch();

    /**
     * Deletes the selected event 
     */
    const handleDeleteClick = () => {
        dispatch(deleteUserEvent(event.id));
    }
    /**
     * local state for whether or not the title is being edited
     */
    const [editable, setEditable] = useState(false);
    /**
     * Allows editing of the event title 
     */
    const handleTitleClick = () => {
        setEditable(true);
    }

    /**
     * A reference to an input variable assigned to it 
     */
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (editable) {
            inputRef.current?.focus()
        }
    }, [editable]);

    const [title, setTitle] = useState(event.title);
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    };
    const handleInputBlur = () => {
        if (title !== event.title) {
            dispatch(updateUserEvent({
                ...event,
                title
            }));
        }
        setEditable(false);
    }

    return (
        <div key={event.id} className="calendar-event">
            <div className="calendar-event-info">
                <div className="calendar-event-time">{startTime.getHours()}:{addZero(startTime.getMinutes())} - {endTime.getHours()}:{addZero(endTime.getMinutes())}</div>
                <div className="calendar-event-title">
                    {editable
                        ? (
                            <input
                                type="text"
                                ref={inputRef}
                                value={title}
                                onChange={handleTitleChange}
                                onBlur={handleInputBlur}
                            />
                        )
                        : (
                            <span onClick={handleTitleClick}>{event.title}</span>
                        )
                    }
                </div>
            </div>
            <button onClick={handleDeleteClick} className="calendar-event-delete-button">&times;</button>
        </div>
    );
};

export default EventItem;