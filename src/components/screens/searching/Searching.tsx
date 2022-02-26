import { useCallback } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { InstantSearch, Hits, connectSearchBox } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import styles from './index.module.scss'

const algoliaAppId: string = process.env.REACT_APP_ALGOLIA_APP_ID || ''
const algoliaSearchApiKey: string =
  process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY || ''

const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

interface ISearchBoxProps {
  currentRefinement?: string
  refine?: (value: string) => any
  onChange?: (e: any) => any
  value?: string
}

const SearchBox = (props: ISearchBoxProps) => {
  const { refine, onChange, currentRefinement } = props
  return (
    <input
      autoFocus
      autoComplete="false"
      placeholder="Search name or by ID"
      className="w-full"
      value={currentRefinement}
      onChange={event => {
        refine?.(event.currentTarget.value)
        onChange?.(event)
      }}
    />
  )
}

const CustomSearchBox = connectSearchBox(SearchBox)

const Searching: React.FC<{}> = () => {
  const navigate = useNavigate()

  const handleClickBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <div className={`${styles.searching} h-full overflow-hidden flex flex-col`}>
      <InstantSearch
        indexName="cell-5-trial-project-users"
        searchClient={searchClient}
      >
        <header className="bg-white p-6 flex items-center gap-4 flex-shrink-0">
          <button onClick={handleClickBack}>
            <RiArrowLeftLine size={24} />
          </button>
          <CustomSearchBox />
        </header>
        <section className="flex flex-col p-6 gap-6 flex-grow-1 overflow-y-auto">
          <Hits
            hitComponent={({ hit }) => {
              return <UserCard {...hit} />
            }}
          />
        </section>
      </InstantSearch>
    </div>
  )
}

interface IUserCardProps {
  firstname: string
  lastname: string
  objectID: string
}

function UserCard(props: Partial<IUserCardProps>) {
  const navigate = useNavigate()
  const { lastname, firstname, objectID } = props

  const handleClick = useCallback(() => {
    navigate(`/messages/${objectID}`)
  }, [navigate, objectID])

  return (
    <button onClick={handleClick} className="flex gap-4 items-center w-full">
      <div
        className="flex justify-center items-center rounded-full bg-gray-200"
        style={{ height: 40, width: 40 }}
      >
        {firstname?.[0].toUpperCase()}
        {lastname?.[0].toUpperCase()}
      </div>
      <div className="capitalize">
        {firstname} {lastname}
      </div>
    </button>
  )
}

export default Searching
