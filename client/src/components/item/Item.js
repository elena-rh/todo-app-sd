import React, {useCallback, useRef, useState} from "react";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {Menu} from "primereact/menu";
import { AvatarGroup } from 'primereact/avatargroup';
import {ItemCount} from "./ItemCount";
import {DueDateDialog} from "./itemDialogs/DueDateDialog";
import {SetReminderDialog} from "./itemDialogs/SetReminderDialog";
import {ItemTag} from "./ItemTag";
import {EditItemDialog} from "./itemDialogs/EditItemDialog";
import {DueDateTag} from "./DueDateTag";
import {AssigneesDialog} from "./itemDialogs/AssigneesDialog";
import {EditTagDialog} from "./itemDialogs/EditTagDialog";
import {AssigneeTag} from "./AssigneeTag";

export function Item({socket, item, listMembers, onItemChange, selectedItems, deleteItem, updateItem}){
    // item dot menu
    const menu = useRef(null);
    let menuItems = [
        {label: 'Edit', icon: 'pi pi-pencil', command:()=>{setDisplayEdit(true)}},
        {label: 'Due date', icon: 'pi pi-calendar', command:()=>{setDisplayCalendar1(true)}},
        {label: 'Assign to', icon: 'pi pi-user-plus', command:()=>{setDisplayAssignees(true)} },
        {label: 'Add reminder', icon: 'pi pi-bell', command:()=>{setDisplayCalendar2(true)}},
        {label: 'Edit tags', icon: 'pi pi-tag', command:()=>{setDisplayEditTag(true)}},
        {label: 'Toggle priority', icon: 'pi pi-star', command:()=>{setPriority(!priority)}},
        {label: 'Delete', icon: 'pi pi-trash', command:()=>{deleteItem(item)}}
    ];

    // dialogs
    const [displayCalendar1, setDisplayCalendar1] = useState(false);
    const [displayCalendar2, setDisplayCalendar2] = useState(false);
    const [displayEditTag, setDisplayEditTag] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayAssignees, setDisplayAssignees] = useState(false);

    // tags
    const [tags, setTags] = useState(item.tags);
    const [dueDate, setDueDate] = useState(item.dueDate);
    const updateTags = useCallback(t => setTags(t), [tags, setTags]);
    const removeTag = useCallback(tag => setTags(tags.filter(t => t._id !== tag._id)), [tags, setTags]);

    // assignees
    const [assignees, setAssignees] = useState(item.assignees);

    // priority star
    const [priority, setPriority] = useState(item.priority);

    return (
        <>
            <div className="flex justify-content-between m-2">
                <div>
                    <div className="field-checkbox m-1 mb-0">
                        <Checkbox inputId={item._id}
                                  name="item" value={item}
                                  onChange={onItemChange}
                                  checked={selectedItems.some((i) => i._id === item._id)}
                        />
                        <span hidden={!priority}>
                            <i className="pi pi-star-fill ml-2" />
                        </span>
                        <label htmlFor={item._id}>{item.title}</label>
                        <ItemCount maxCount={item.count} />
                    </div>

                    <div className="flex align-items-center flex-wrap pl-4">
                        {
                            tags.map((tag) => {
                                return (<ItemTag key={tag._id}
                                                 itemId={item._id}
                                                 tag={tag}
                                                 removeTag={removeTag}
                                                 text={tag.title}
                                                 colorIndex={tag.colorIndex}/> )
                            })
                        }
                        <DueDateTag
                            dueDate={dueDate}
                        />
                        <AvatarGroup>
                        {
                            assignees.map((assignee) => {
                                return (
                                    <AssigneeTag
                                        key={assignee._id}
                                        assignee={assignee} />
                                )
                            })
                        }
                        </AvatarGroup>
                    </div>
                </div>
                <Button icon="pi pi-ellipsis-v"
                        onClick={(e) => menu.current.toggle(e)}
                        className="p-button-rounded p-button-icon-only p-button-text" />
                <Menu model={menuItems} popup ref={menu} />
            </div>

            <DueDateDialog
                itemId={item._id}
                displayCalendar={displayCalendar1}
                setDisplayCalendar={setDisplayCalendar1}
                setDueDate={setDueDate} />
            <SetReminderDialog
                itemId={item._id}
                displayCalendar={displayCalendar2}
                setDisplayCalendar={setDisplayCalendar2} />

            <EditTagDialog
                itemId={item._id}
                removeTag={removeTag}
                tags={tags}
                updateTags={updateTags}
                display={displayEditTag}
                setDisplay={setDisplayEditTag} />

            <EditItemDialog
                item={item}
                updateItem={updateItem}
                displayDialog={displayEdit}
                setDisplayDialog={setDisplayEdit} />

            <AssigneesDialog
                itemId={item._id}
                display={displayAssignees}
                setDisplay={setDisplayAssignees}
                listMembers={listMembers}
                assignees={assignees}
                setAssignees={setAssignees}/>
        </>
    )
}