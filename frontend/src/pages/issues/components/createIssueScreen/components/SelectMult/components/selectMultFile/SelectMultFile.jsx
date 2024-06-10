import React, { useEffect, useState, forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import {
    CheckIcon,
    XCircle,
    ChevronDown,
    XIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import GetLanguageInfos from '@/pages/projects/components/utils/getLanguageInfo/GetLanguageInfos';
import { Link, useParams } from 'react-router-dom';

const multiSelectVariants = cva(
    'm-1 flex gap-2',
    {
        variants: {
            variant: {
                default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
                secondary: 'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                inverted: 'inverted',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const MultiSelect = forwardRef(
    (
        {
            options,
            onValueChange,
            variant,
            defaultValue = [],
            placeholder = 'Select options',
            animation = 0,
            asChild = false,
            className,
            ...props
        },
        ref
    ) => {
        const { idProject } = useParams();
        const [selectedValues, setSelectedValues] = useState(defaultValue);
        const [isPopoverOpen, setIsPopoverOpen] = useState(false);

        useEffect(() => {
            if (JSON.stringify(selectedValues) !== JSON.stringify(defaultValue)) {
                setSelectedValues(defaultValue);
            }
        }, [defaultValue]);

        const handleInputKeyDown = (event) => {
            if (event.key === 'Enter') {
                console.log(event.currentTarget.value);
                setIsPopoverOpen(true);
            } else if (event.key === 'Backspace' && !event.currentTarget.value) {
                const newSelectedValues = [...selectedValues];
                newSelectedValues.pop();
                setSelectedValues(newSelectedValues);
                onValueChange(newSelectedValues);
            }
        };

        const toggleOption = (value) => {
            const newSelectedValues = selectedValues.includes(value)
                ? selectedValues.filter((v) => v !== value)
                : [...selectedValues, value];
            setSelectedValues(newSelectedValues);
            onValueChange(newSelectedValues);
        };

        const handleClear = () => {
            setSelectedValues([]);
            onValueChange([]);
        };

        const handleTogglePopover = () => {
            setIsPopoverOpen((prev) => !prev);
        };

        return (
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button
                        ref={ref}
                        {...props}
                        onClick={handleTogglePopover}
                        className={cn(
                            'flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit',
                            className
                        )}
                    >
                        {selectedValues.length > 0 ? (
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-wrap items-center">
                                    {selectedValues.map((value) => {
                                        const option = options.find((o) => o.idFile === value);
                                        if (!option) return null;
                                        return (
                                            <Badge
                                                key={value}
                                                className={cn(
                                                    multiSelectVariants({ variant, className })
                                                )}
                                                style={{
                                                    animationDuration: `${animation}s`,
                                                }}
                                            >
                                                {option.fileName && (
                                                    <img
                                                        src={
                                                            option.fileName &&
                                                                GetLanguageInfos(option.fileName)
                                                                ? GetLanguageInfos(option.fileName).imgUrl
                                                                : ""
                                                        }
                                                        width={"20px"}
                                                        alt={option.fileName}
                                                    />
                                                )}
                                                <Link
                                                    to={`/project/file/${idProject}/${option.idFile}`}
                                                    target='_blank'
                                                    className='text-secondary'
                                                >
                                                    {option.fileName}
                                                </Link>
                                                <XCircle
                                                    className="ml-2 h-4 w-4 cursor-pointer"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        toggleOption(value);
                                                    }}
                                                />
                                            </Badge>
                                        );
                                    })}
                                </div>
                                <div className="flex items-center justify-between">
                                    <XIcon
                                        className="h-4 mx-2 cursor-pointer text-muted-foreground"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleClear();
                                        }}
                                    />
                                    <Separator
                                        orientation="vertical"
                                        className="flex min-h-6 h-full"
                                    />
                                    <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between w-full mx-auto">
                                <span className="text-sm text-muted-foreground mx-3">
                                    {placeholder}
                                </span>
                                <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
                            </div>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-full md:w-[400px] p-0"
                    align="start"
                    onEscapeKeyDown={() => setIsPopoverOpen(false)}
                >
                    <Command>
                        <CommandInput
                            placeholder="Search..."
                            onKeyDown={handleInputKeyDown}
                        />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => {
                                    const isSelected = selectedValues.includes(option.idFile);
                                    return (
                                        <CommandItem
                                            key={option.idFile}
                                            onSelect={() => toggleOption(option.idFile)}
                                            style={{
                                                pointerEvents: 'auto',
                                                opacity: 1,
                                            }}
                                            className="cursor-pointer hover:bg-accent"
                                        >
                                            <div
                                                className={cn(
                                                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                                    isSelected
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'opacity-50 [&_svg]:invisible'
                                                )}
                                            >
                                                <CheckIcon className="h-4 w-4" />
                                            </div>
                                            <span>{option.fileName}</span>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup>
                                <div className="flex items-center justify-between">
                                    {selectedValues.length > 0 && (
                                        <>
                                            <CommandItem
                                                onSelect={handleClear}
                                                style={{
                                                    pointerEvents: 'auto',
                                                    opacity: 1,
                                                }}
                                                className="flex-1 justify-center cursor-pointer"
                                            >
                                                Clear
                                            </CommandItem>
                                            <Separator
                                                orientation="vertical"
                                                className="flex min-h-6 h-full"
                                            />
                                        </>
                                    )}
                                    <CommandSeparator />
                                    <CommandItem
                                        onSelect={() => setIsPopoverOpen(false)}
                                        style={{
                                            pointerEvents: 'auto',
                                            opacity: 1,
                                        }}
                                        className="flex-1 justify-center cursor-pointer"
                                    >
                                        Close
                                    </CommandItem>
                                </div>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    }
);

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
