import classNames from '../../utils/classNames';

function Regular() {
  return (
    <div
      className={classNames(
        "bg-primary-hover border-white ring-primary-hover text-white",
        "flex justify-center items-center border-2 rounded-lg ring-1 h-11 w-11"
      )}
    >
      A<i className="ri-arrow-right-s-fill -m-1"></i>
    </div>
  )
}

function Inverted() {
  return (
    <div
      className={classNames(
        "bg-white border-primary-hover ring-white text-primary-hover",
        "flex justify-center items-center border-2 rounded-lg ring-1 h-11 w-11"
      )}
    >
      A<i className="ri-arrow-right-s-fill -m-1"></i>
    </div>
  )
}

function New() {
  return (
    <div className='flex items-center'>
      <div
        className='w-5 h-5 rounded-full mr-1 mt-[3px]'
        style={{
          background: 'linear-gradient(to right, #C4B5FD 0%, #A78BFA 30%, #7C3AED 60%, #5b21b6 100%)',
        }}
      />
      <div className="font-semibold text-2xl">surge</div>
    </div>
  )
}

const Logo = {
  New: New,
  Regular: Regular,
  Inverted: Inverted,
};

export default Logo;