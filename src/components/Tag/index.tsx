import { Tag } from "@prisma/client";
import classNames from "../../utils/classNames";
import { useMemo, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { api } from "../../utils/api";

// TYPES
type TagProps = {
  label: string;
  size: 'sm' | 'lg';
  onRemove?: () => void;
}

type TagGroupProps = {
  initialTags: Tag[];
  size: 'sm' | 'lg';
  allowAdd?: boolean;
  allowRemove?: boolean;
  onChange: (tags: Tag[]) => void;
}

const CSize = {
  span: {
    'sm': 'px-2.5 py-1 text-xs',
    'lg': 'px-3 py-0.5 text-sm',
  },
  svg: {
    'sm': '-ml-0.5',
    'lg': '-ml-1',
  },
};

function Tag({ label, size, onRemove }: TagProps): JSX.Element {
  return (
    <span 
      className={classNames(
        CSize.span[size],
        onRemove ? 'cursor-pointer' : '',
        "inline-flex items-center rounded-md bg-indigo-100 text-indigo-800 whitespace-nowrap"
      )}
      onClick={onRemove}
    >
      {label}
      {onRemove && (
        <svg className="h-2 w-2 ml-1" stroke="currentColor" fill="none" viewBox="0 0 8 8">
          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      )}
    </span>
  )
}

export default function TagGroup({ initialTags, size, allowAdd, allowRemove, onChange }: TagGroupProps) {
  // API
  const { data: tags } = api.tag.getAll.useQuery();
  const createMutation = api.tag.create.useMutation();

  // STATE
  const [selectedTags, setSelectedTags] = useState<Tag[]>(initialTags)
  const [query, setQuery] = useState('')

  // MEMO
  const filteredTags: Tag[] = useMemo(() => {
    // Remove all selected tags
    const noDuplicateTags = (tags || []).filter((tag) => selectedTags.findIndex((t) => t.id === tag.id) === -1);
    if (query.length < 3) return noDuplicateTags;
    return noDuplicateTags.filter((tag) => {
      return tag.label.toLowerCase().includes(query.toLowerCase())
    });
  }, [selectedTags, tags, query]);

  const shouldShowCreateOption = useMemo(() => {
    // Query length is >= 3
    // No tag matches exactly
    return query.length >= 3 && (tags || []).findIndex((el) => el.label === query) === -1;
  }, [query, tags]);

  // EVENT HANLDERS
  const onRemoveTag = (tagId: string) => {
    // Optimistic state update
    const idx = selectedTags.findIndex((el) => el.id === tagId);
    if (idx > -1) {
      const updTags = [...selectedTags.slice(0, idx), ...selectedTags.slice(idx + 1)];
      setSelectedTags(updTags);
      // Propagate to HOC
      onChange(updTags);
    }
  }

  const onAddTag = async (tags: Tag[]) => {
    setQuery('');
    // The last tag is the new one, so
    if (tags.length === 0) return;
    const newTagProto = tags[tags.length - 1];
    if (!newTagProto) return;

    if (newTagProto.id == null) {
      const newTag = await createMutation.mutateAsync({ label: newTagProto.label });
      const updTags = [...selectedTags, newTag];
      setSelectedTags(updTags);
      onChange(updTags);
    } else {
      // Optimistic state update
      setSelectedTags(tags);
      onChange(tags);
    }
  }

  return (
    <Combobox
      value={selectedTags}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onChange={onAddTag}
      multiple
    >
      <div
        className="flex h-9 px-2 items-center space-x-2 border w-full rounded-md border-gray-300 shadow-sm focus-within:ring-emerald-700 focus-within:border-emerald-700 focus-within:ring-1 focus-within:shadow-sm"
      >
        {selectedTags.length > 0 && (
          selectedTags.map((tag) => (
            <Tag
              key={tag.id}
              label={tag.label}
              size={size}
              onRemove={allowRemove ? () => onRemoveTag(tag.id) : undefined}
            />
          ))
        )}
        {allowAdd && (
          <Combobox.Input
            onChange={(e) =>setQuery(e.target.value)}
            placeholder="Type to search for tags"
            className={classNames(
              "placeholder:text-xs text-xs border-none pl-0 ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 focus:border-none w-full"
            )}
            value={query}
          />
        )}
      </div>
      <Combobox.Options
        className="absolute z-10 mt-1 max-h-60 w-44 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        {shouldShowCreateOption && (
          <Combobox.Option
            className="text-gray-900 relative select-none py-2 pl-3 pr-9 hover:bg-neutral-100 cursor-pointer"
            value={{ id: null, label: query }}
          >
            Create <span className="font-semibold"><i>&quot;{query}&quot;</i></span>
          </Combobox.Option>
        )}
        {filteredTags.map((tag) => (
          <Combobox.Option
            className="text-gray-900 relative select-none py-2 pl-3 pr-9 hover:bg-neutral-100 cursor-pointer"
            key={tag.id} value={tag}
          >
            {tag.label}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}